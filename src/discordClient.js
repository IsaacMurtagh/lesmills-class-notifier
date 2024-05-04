import axios from 'axios';

export async function sendWebhook({ url, content }) {
  await axios.post(
    url,
    { content }
  )
  return;
}