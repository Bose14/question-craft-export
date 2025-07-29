const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const forgotPasswordRoute = require('./routes/forgotPassword');
const statsRoutes = require("./routes/stats") 
const extractRoute = require('./routes/extract');
const generateRoute = require('./routes/generate');
const answerKeyRoute = require('./routes/generateAnswer');
const slackRoute=require('./routes/slack');
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'https://vinathaal.azhizen.com'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api', authRoutes);
app.use('/api', forgotPasswordRoute); 
app.use('/api', statsRoutes);
app.use('/api/extract-syllabus', extractRoute);
app.use("/api", generateRoute);
app.use('/api', answerKeyRoute);
app.use('/api',slackRoute);

const supportRoutes = require('./routes/support');
app.use('/api', supportRoutes);


const resetPasswordRoute = require('./routes/resetPassword');
app.use('/api', resetPasswordRoute);


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});


const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.OWNER_EMAIL_USER,
    pass: process.env.OWNER_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


// GET /api/user/profile
app.get("/api/user/profile",  async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const [rows] = await db.query("SELECT full_name, email FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
