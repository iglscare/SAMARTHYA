import dotenv from 'dotenv';
import { createApp } from './app';
import { connectDB, closeDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5001;

async function bootstrap() {
  try {
    // 1. Initialize MongoDB Atlas connection & TTL Indexes
    await connectDB();

    // 2. Initialize Express application with all MoSPI sovereign modules
    const app = createApp();

    // 3. Start listening on PORT
    const server = app.listen(PORT, () => {
      console.log(`[SAMARTHYA Backend] Server running at http://localhost:${PORT}`);
      console.log(`[SAMARTHYA Backend] Health check: http://localhost:${PORT}/api/health`);
      console.log(`[SAMARTHYA Backend] Modules mounted: /api/auth, /api/skills, /api/roadmap, /api/test, /api/courses, /api/dept, /api/mentor`);
    });

    // Graceful Shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n[SAMARTHYA Backend] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await closeDB();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('[SAMARTHYA Backend] Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
