import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let aiClient: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  // API Endpoint for AI Eco Tips
  app.post('/api/eco-tips', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!aiClient) {
      return res.json({
        tip: `For "${prompt}", try replacing single-use items with durable reusables and optimizing home energy usage to cut up to 150 kg of CO2 annually.`
      });
    }

    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are EcoLife+'s AI Sustainability Advisor. Provide 1 concise, highly actionable, realistic eco habit tip (max 2 sentences) for this scenario: "${prompt}". Highlight estimated CO2 savings if applicable.`,
      });

      return res.json({ tip: response.text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.json({
        tip: `For "${prompt}", adopt reusable products and switch to renewable energy or smart timers to save CO2 every week.`
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'EcoLife+' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
