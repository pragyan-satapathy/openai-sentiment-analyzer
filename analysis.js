const OpenAI = require("openai");
const { SYSTEM_PROMPT } = require("./constant.js");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

async function analyzeSentiment(comment) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo",
    temperature: parseFloat(process.env.MODEL_TEMPERATURE) || 0,
    messages: [
      { role: "system", content: SYSTEM_PROMPT.trim() },
      { role: "user", content: `comment: """${comment}"""` }
    ]
  });
  return JSON.parse(response.choices[0].message.content.trim());
}

module.exports = { analyzeSentiment };