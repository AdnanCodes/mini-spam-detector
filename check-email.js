const { SpamAssassinClient } = require("spamassassin-client");
const fs = require("fs");

const emails = JSON.parse(fs.readFileSync("./email.json", "utf8"));

const client = new SpamAssassinClient({
  host: "localhost",
  port: 7830,
});

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

emails.sampleEmails.forEach(async (email) => {
  try {
    const emlString = createEMLString(email);
    const result = await client.check(emlString);
    console.info("Spam check Result", result);
  } catch (error) {
    console.error("Failed to check for spam", error);
  }
});
