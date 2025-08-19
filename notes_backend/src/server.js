import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { notesRouter } from './routes/notes.js';
import { categoriesRouter } from './routes/categories.js';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const app = express();

// PUBLIC_INTERFACE
function buildApp() {
  /** Build and configure the Express application.
   * - CORS with configurable origin from env
   * - JSON body parser
   * - Request logging
   * - Routes for /notes and /categories
   * - /health endpoint
   * Returns the configured Express app for server start or testing.
   */
  app.use(cors({
    origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN,
    credentials: true
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/notes', notesRouter);
  app.use('/categories', categoriesRouter);

  // Global error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // Generic error response with safe message
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  });

  return app;
}

buildApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Notes API running on port ${PORT}`);
});

export default app;
