// api/gpt.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // 🔑 Make sure this key exists in Vercel
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: 'openchat/openchat-3.5-0106', // ✅ Use a free model from OpenRouter
      messages: [{ role: 'user', content: prompt }],
    });

    const result = chat.choices?.[0]?.message?.content || 'No response from GPT';
    res.status(200).json({ result });
  } catch (err) {
    console.error('❌ GPT API failed:', err);
    res.status(500).json({ error: 'GPT API failed', details: err.message || err.toString() });
  }
}
