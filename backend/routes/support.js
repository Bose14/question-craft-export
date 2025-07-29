// routes/support.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const db = require('../awsdb');

require('dotenv').config();


// 🔹 Email + Slack handler
router.post('/support', async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // 1️⃣ Send Email to Owner
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // ✅ Allow self-signed certs
    },
    });


    await transporter.sendMail({
      from: `"Support Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Owner's email address
      subject: `New Support Message - ${subject}`,
      html: `
        <h2>Support Message from ${fullName}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

   


    res.json({ message: 'Support message sent successfully' });
  } catch (err) {
    console.error('Support message error:', err);
    res.status(500).json({ message: 'Failed to send support message' });
  }
});

module.exports = router;
