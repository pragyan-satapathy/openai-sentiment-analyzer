const OpenAI = require("openai");
const { SYSTEM_PROMPT } = require("./constant.js");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeSentiment(comment) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      { role: "system", content: SYSTEM_PROMPT.trim() },
      { role: "user", content: `comment: """${comment}"""` }
    ]
  });
  return JSON.parse(response.choices[0].message.content.trim());
}

module.exports = { analyzeSentiment };