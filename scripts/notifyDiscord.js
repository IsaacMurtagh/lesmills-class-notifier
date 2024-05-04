import { sendWebhook } from "../src/discordClient.js"
import getClassConfig from "./getClassConfig.js";
import { getClasses } from "../src/lesmillsClient.js";

const discordChannels = [
  {
    webhook: process.env.MONDAY_CEREMONY_DISCORD_URL,
    day: 'MONDAY'
  },
  {
    webhook: process.env.TUESDAY_CEREMONY_DISCORD_URL,
    day: 'TUESDAY'
  },
  {
    webhook: process.env.WEDNESDAY_CEREMONY_DISCORD_URL,
    day: 'WEDNESDAY'
  },
  {
    webhook: process.env.THURSDAY_CEREMONY_DISCORD_URL,
    day: 'THURSDAY'
  },
  {
    webhook: process.env.FRIDAY_CEREMONY_DISCORD_URL,
    day: 'FRIDAY'
  },
  {
    webhook: process.env.SATURDAY_CEREMONY_DISCORD_URL,
    day: 'SATURDAY'
  },
  {
    webhook: process.env.SUNDAY_CEREMONY_DISCORD_URL,
    day: 'SUNDAY'
  },
]
const classConfig = getClassConfig()

const validClasses = (await getClasses({
  classes: classConfig.classNames,
  gyms: classConfig.gyms
})).filter(card => card.assertValid(classConfig))

for(const channel of discordChannels) {
  const matchingClasses = validClasses
    .filter(c => c.day == channel.day)
    .filter(c => c.available);

  if (!matchingClasses.length) {
    continue
  }

  const content = matchingClasses
    .map(c => c.toString())
    .join('\n');

  await sendWebhook({ url: channel.webhook, content });
}