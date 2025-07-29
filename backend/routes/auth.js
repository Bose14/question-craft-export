// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// This exports a "factory" function.
// It creates the router once it receives its dependencies (db, transporter, config).
module.exports = function(db, transporter, config) {
  const router = express.Router();

  const sendResetEmail = async (email, token) => {
    const resetLink = `${config.FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: `QuestionPaper AI <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link to proceed: <a href="${resetLink}">Reset Password</a>. This link expires in 1 hour.</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent successfully to:', email);
  };

  // SIGNUP
  router.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      const existingUsers = await db.query('SELECT email FROM users WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO users SET ?', { name, email, password_hash: passwordHash, role: 'user' });
      
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Server error during signup.' });
    }
  });

  // LOGIN
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      
      res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Server error during login.' });
    }
  });

  // FORGOT PASSWORD
  router.post('/forgot-password', async (req, res) => {
    const successMessage = 'If an account with that email exists, a reset link has been sent.';
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
      }
      
      const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (results.length > 0) {
        const user = results[0];
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

        await db.query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [resetToken, resetTokenExpires, user.id]);
        await sendResetEmail(email, resetToken);
      }
      
      res.json({ message: successMessage });
    } catch (error) {
      console.error('Forgot Password Error:', error);
      res.json({ message: successMessage }); // Always return success for security
    }
  });

  // RESET PASSWORD
  router.post('/reset-password', async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Valid token and a password of at least 6 characters are required.' });
      }

      const results = await db.query('SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()', [token]);
      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }

      const user = results[0];
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await db.query('UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?', [passwordHash, user.id]);
      
      res.json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      console.error('Reset Password Error:', error);
      res.status(500).json({ message: 'Server error during password reset.' });
    }
  });

  return router;
};