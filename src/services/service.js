export async function generateFormWithGPT(prompt) {
  const response = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GPT Error: ${error.error || "Unknown"}`);
  }

  const data = await response.json();
  return data.result;
}

