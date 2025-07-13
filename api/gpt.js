export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
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
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await gptResponse.json();

    // 🧠 Debug log to inspect structure
    console.log("🌐 GPT raw response:", JSON.stringify(data));

    // ✅ Check for GPT content
    if (
      data &&
      Array.isArray(data.choices) &&
      data.choices[0]?.message?.content
    ) {
      return res.status(200).json({ result: data.choices[0].message.content });
    }

    // ❌ Otherwise return full raw data for inspection
    return res.status(500).json({
      error: "Invalid GPT response",
      raw: data,
    });

  } catch (err) {
    console.error("❌ GPT fetch failed:", err.message);
    return res.status(500).json({
      error: "GPT API failed",
      details: err.message,
    });
  }
}
