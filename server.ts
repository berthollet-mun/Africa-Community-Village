import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './server/routes/api';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsers with generous limits for media/rich content
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads directory serving
const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));
app.use('/public', express.static(path.resolve(process.cwd(), 'public')));

// Mount API routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  if (!isProduction) {
    // In development mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    // In production mode, serve built static assets
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ACV Server] Server running at http://0.0.0.0:${PORT}`);
    console.log(`[ACV Server] Backend API mounted at http://0.0.0.0:${PORT}/api`);
  });
}

startServer().catch((err) => {
  console.error('[ACV Server] Failed to start server:', err);
  process.exit(1);
});
