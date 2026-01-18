import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/firebase.js'; // Initialize Firebase Admin SDK
import financialProfileRoutes from './routes/financialProfile.js';
import creditScoreRoutes from './routes/creditScore.js';
import emiRoutes from './routes/emi.js';
import chatbotRoutes from './routes/chatbot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/financial-profile', financialProfileRoutes);
app.use('/api/credit-score', creditScoreRoutes);
app.use('/api/emi', emiRoutes);
app.use('/api/chatbot', chatbotRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    code: err.code || 'SERVER_ERROR',
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    Credit Companion API Server         ║
╚════════════════════════════════════════╝

Environment: ${NODE_ENV}
Server: http://localhost:${PORT}
Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}

Endpoints:
  GET    /api/health                     - Health check
  POST   /api/financial-profile          - Create profile
  GET    /api/financial-profile          - Get profile
  PUT    /api/financial-profile          - Update profile
  PATCH  /api/financial-profile          - Partial update
  GET    /api/financial-profile/exists   - Check if profile exists
  POST   /api/credit-score/calculate     - Calculate credit score
  GET    /api/credit-score               - Get credit score
  POST   /api/credit-score/what-if       - What-if scenario credit score
  `);
});

export default app;
