import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import authRoutes from './routes/auth.routes';
import newsRoutes from './routes/news.routes';
import researchRoutes from './routes/research.routes';
import contactRoutes from './routes/contact.routes';
import staffRoutes from './routes/staff.routes';
import searchRoutes from './routes/search.routes';
import statsRoutes from './routes/stats.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow Vercel domain + localhost dev
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL || '',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Compress responses
app.use(compression());

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting — global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', globalLimiter);

// Stricter rate limit for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many auth attempts, please try again later.' },
});

// Serve uploaded files as static
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Swagger
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'FCI Tanta University API',
    version: '2.0.0',
    description: 'Full API for the Faculty of Computers and Information website',
  },
  servers: [{ url: `/api/v1`, description: 'API Server' }],
  paths: {
    '/auth/login': { post: { summary: 'Login', responses: { '200': { description: 'Token returned' } } } },
    '/auth/register': { post: { summary: 'Register', responses: { '201': { description: 'User created' } } } },
    '/news': { get: { summary: 'List news', responses: { '200': { description: 'OK' } } } },
    '/research': { get: { summary: 'List research papers', responses: { '200': { description: 'OK' } } } },
    '/contact': { post: { summary: 'Send contact message', responses: { '201': { description: 'Sent' } } } },
    '/staff': { get: { summary: 'List staff', responses: { '200': { description: 'OK' } } } },
    '/search': { get: { summary: 'Global search', responses: { '200': { description: 'Results' } } } },
    '/stats': { get: { summary: 'Admin stats', responses: { '200': { description: 'OK' } } } },
  },
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/research', researchRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/stats', statsRoutes);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
});
