require("dotenv").config();
const express = require("express");
const { SpamAssassinClient } = require("spamassassin-client");

const app = express();
app.use(express.json());

console.log("SA_HOST", process.env.SA_HOST);
console.log("SA_PORT", process.env.SA_PORT);

const spamAssassinClient = new SpamAssassinClient({
  host: process.env.SA_HOST || "127.0.0.1",
  port: Number(process.env.SA_PORT) || 783,
});

// Ping to check whether the spam assassin server is running
async function pingSpamAssassin() {
  try {
    await spamAssassinClient.ping();
    console.log("Spam Assassin server is running");
  } catch (error) {
    console.error("Failed to ping spam assassin server", error);
  }
}

function createEMLString(email) {
  const headers = [
    `From: ${email.from}`,
    `To: ${email.to}`,
    `Subject: ${email.subject}`,
    `Date: ${new Date().toUTCString()}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
  ];

  const emlContent = headers.join("\r\n") + "\r\n\r\n" + email.body;
  return emlContent;
}

app.post("/check-email", async (req, res) => {
  const email = req.body;
  try {
    const emlString = createEMLString(email);
    const result = await spamAssassinClient.check(emlString);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Failed to check for spam", error);
    res.status(500).json({ error: "Failed to check for spam" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Spam Detector server is running on port ${PORT}`);
  pingSpamAssassin();
});
