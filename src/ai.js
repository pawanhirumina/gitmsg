import callPrompt from "./prompt.js";
export async function generateCommitMessage(diff) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.log("API key is not configured");
    process.exit(1);
  }

  const fullPrompt = callPrompt(diff);
  const baseUrl =
    process.env.GROQ_BASE_URL ||
    "https://api.groq.com/openai/v1/chat/completions";
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: fullPrompt }],
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
