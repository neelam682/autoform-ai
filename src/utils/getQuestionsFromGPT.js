export async function getQuestionsFromGPT(formType, region = "USA") {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("No auth credentials found");
  }

  const prompt = `
You are an expert form builder AI.

Generate a complete, professional-level ${formType} form for the ${region} region.

Include ALL legally and practically necessary sections and questions.

The format should be valid JSON, like:

{
  "formType": "${formType}",
  "region": "${region}",
  "sections": [
    {
      "title": "Section Name",
      "questions": ["Question 1", "Question 2", ...]
    },
    ...
  ]
}

Only return JSON. No explanation. Include everything critical, even if long.

For a ${formType} form, include the following sections:

${formType === "Visa" ? `
- Personal Information
- Travel Information
- Passport Details
- U.S. Contact Information
- Family Information
- Work/Education/Training
- Security and Background
- Additional Information
` : formType === "Job Application" ? `
- Applicant Information
- Employment Eligibility
- Education
- Employment History
- Skills and Qualifications
- References
- Availability
- Signature
` : formType === "Rental Application" ? `
- Applicant Information
- Residential History
- Employment and Income
- References
- Background Information
- Emergency Contacts
- Signature
` : `
- Custom Section
`}
`;


  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Referer": "http://localhost:5173", // must be valid, no 'HTTP-' prefix
      "X-Title": "AutoFormAI"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // ✅ fixed model name
      messages: [
        { role: "system", content: "You are a world-class professional form generation assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("GPT Error:", errorText);
    throw new Error(`GPT API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse GPT response:", content);
    throw new Error("Invalid JSON from GPT");
  }
}




