import { SpamAssassinClient } from "spamassassin-client";
import emails from "./email.json" assert { type: "json" };

const client = new SpamAssassinClient({
  host: "http://192.168.68.92",
  port: 7830,
});

emails.sampleEmails.forEach(async (email) => {
  const result = await client.check(email);
  console.log(result);
});
