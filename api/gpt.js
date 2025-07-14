export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({
      error: "Missing OpenRouter API key in environment variables",
    });
  }

  const { prompt } = req.body;

  try {
    const gptResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // ✅ Corrected model name
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await gptResponse.json();

    console.log("🌐 GPT raw response:", JSON.stringify(data));

    if (data.error) {
      return res.status(500).json({
        error: "OpenRouter returned an error",
        full: data,
      });
    }

    const content = data.choices?.[0]?.message?.content || data.choices?.[0]?.text;
    if (!content) {
      return res.status(500).json({ error: "No valid content", full: data });
    }

    return res.status(200).json({ result: content });

  } catch (err) {
    return res.status(500).json({
      error: "API crashed",
      message: err.message,
    });
  }
}

