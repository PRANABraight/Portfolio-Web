// Local-dev shim: mounts the Vercel serverless handler on Express.
// In production, Vercel serves api/send-email.js directly.
import express from 'express';
import dotenv from 'dotenv';
import handler from './api/send-email.js';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3000;

app.use(express.json());
app.post('/api/send-email', handler);

app.listen(port, () => {
  console.log(`Dev API server running at http://localhost:${port}`);
});
