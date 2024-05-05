import { sendWebhook } from "../src/discordClient.js"

const now = new Date().toISOString();
try {
  await sendWebhook({ 
    url: process.env.HEALTHCHECK_DISCORD_URL,
    content: now,
  });
  console.log({
    time: now,
    info: {
      channel: 'healthcheck',
    }
  })
} catch(err) {
  console.log({
    time: now,
    err,
    info: {
      channel: 'healthcheck',
    }
  })
}
