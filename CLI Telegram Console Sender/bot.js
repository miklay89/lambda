process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '5316493509:AAFzEkpjuAP_L7yjqbjeLoYt3Wxaxi9-gOg';
const chatID = '662535551';
const bot = new TelegramBot(token, {polling: true});

async function messageSender(message) {
  await bot.sendMessage(chatID, message);
  console.log('Message was sent.');
  process.exit();
}

async function photoSender(path) {
  const stream = fs.createReadStream(path);
  await bot.sendPhoto(chatID, stream);
  console.log('Photo was sent.');
  process.exit();
}

module.exports = {
  messageSender,
  photoSender
};