import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.js';

const app = express();

app.use(cors());
app.use(express.json());

// Base API Routes
app.use('/api', apiRouter);

// 404 handler for API routes
app.use((req, res, _next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
