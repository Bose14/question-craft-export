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
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

