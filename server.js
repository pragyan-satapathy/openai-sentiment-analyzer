const express = require("express");
const { analyzeSentiment } = require("./analysis.js");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/sentiment", async (req, res) => {
  const { comment } = req.body;
  if (typeof comment !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'comment'" });
  }
  try {
    const result = await analyzeSentiment(comment);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

module.exports = { startServer };