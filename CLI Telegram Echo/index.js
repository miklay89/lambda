process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const url = 'https://picsum.photos/200/300';
const token = '5316493509:AAFzEkpjuAP_L7yjqbjeLoYt3Wxaxi9-gOg';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const user = msg.from.username;
  const message = msg.text;
  const chatId = msg.chat.id;

  if(message == 'photo') {
    const generatedUrl = await getPhotoUrl(url);
    bot.sendPhoto(chatId, generatedUrl)
    console.log(`User: ${user} requests the photo`);
    return;
  }

  bot.sendMessage(chatId, `You write: ${message}`);
  console.log(`Message from ${user}: ${message}`)
});

async function getPhotoUrl(urlResource) {
  try {
    const response = await axios.get(urlResource);
    const generatedUrl = response.request.res.responseUrl;
    return generatedUrl;
  } catch (err) {
    console.log(err);
  }
}