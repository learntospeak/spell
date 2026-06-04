export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    response.status(500).json({ error: "OPENAI_API_KEY is not configured" });
    return;
  }

  let body = {};
  try {
    body = typeof request.body === "string"
      ? JSON.parse(request.body || "{}")
      : request.body || {};
  } catch (error) {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }
  const subject = String(body.subject || "practice");
  const stage = String(body.stage || "unknown");
  const skill = String(body.skill || "unknown skill");
  const question = String(body.question || "");
  const progress = body.progress || {};

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.1-mini",
      input: [
        {
          role: "system",
          content: "You are a warm Australian primary school tutor. Give one short hint, not the answer. Keep it under 35 words."
        },
        {
          role: "user",
          content: JSON.stringify({ subject, stage, skill, question, progress })
        }
      ],
      store: false
    })
  });

  if (!openaiResponse.ok) {
    const error = await openaiResponse.text();
    response.status(502).json({ error });
    return;
  }

  const data = await openaiResponse.json();
  const hint = data.output_text || extractOutputText(data) || "Try breaking the question into smaller parts first.";
  response.status(200).json({ hint });
}

function extractOutputText(data) {
  const output = Array.isArray(data.output) ? data.output : [];
  return output
    .flatMap((item) => Array.isArray(item.content) ? item.content : [])
    .map((item) => item.text || "")
    .filter(Boolean)
    .join(" ")
    .trim();
}
