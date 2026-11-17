import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/routes';
import skillsRoutes from './modules/skills/routes';
import roadmapRoutes from './modules/roadmap/routes';
import testRoutes from './modules/test/routes';
import coursesRoutes from './modules/courses/routes';
import deptRoutes from './modules/dept/routes';
import mentorRoutes from './modules/mentor/routes';

export function createApp(): Application {
  const app: Application = express();

  // Middleware
  app.use(
    cors({
      origin: true, // Allow frontend during development & production
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Sovereign Gateway Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      service: 'SAMARTHYA MoSPI Sovereign API Gateway',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      modules: ['auth', 'skills', 'roadmap', 'test', 'courses', 'dept', 'mentor'],
    });
  });

  // Mount Feature Modules
  app.use('/api/auth', authRoutes);
  app.use('/api/skills', skillsRoutes);
  app.use('/api/roadmap', roadmapRoutes);
  app.use('/api/test', testRoutes);
  app.use('/api/courses', coursesRoutes);
  app.use('/api/dept', deptRoutes);
  app.use('/api/mentor', mentorRoutes);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'API route not found on SAMARTHYA Sovereign Platform Gateway',
    });
  });

  // Global Error Handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[App Error Handler]:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  });

  return app;
}

export default createApp;
