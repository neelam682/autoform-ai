const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const GROK_URL = 'https://api.groq.com/openai/v1/chat/completions';

const openRouterHeaders = {
  'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': 'https://yourdomain.com',
  'X-Title': 'AutoFormAI',
};

const grokHeaders = {
  'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
  'Content-Type': 'application/json',
};

async function askWithModel(url, headers, model, prompt) {
  const body = {
    model,
    messages: [
      { role: "system", content: "You are a JSON-only assistant. Always return valid JSON. No explanations." },
      { role: "user", content: prompt },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`${model} failed: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function smartAsk(prompt) {
  try {
    return await askWithModel(GROK_URL, grokHeaders, "mixtral-8x7b-32768", prompt);
  } catch (err1) {
    console.warn("⚠️ Grok failed. Trying GPT-4.5...", err1);
    try {
      return await askWithModel(OPENROUTER_URL, openRouterHeaders, "openai/gpt-4.5-turbo", prompt);
    } catch (err2) {
      console.warn("⚠️ GPT-4.5 failed. Trying GPT-3.5...", err2);
      try {
        return await askWithModel(OPENROUTER_URL, openRouterHeaders, "openai/gpt-3.5-turbo", prompt);
      } catch (err3) {
        console.error("❌ All models failed.", err3);
        throw err3;
      }
    }
  }
}
