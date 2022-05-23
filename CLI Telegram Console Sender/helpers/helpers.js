const botModule = require('../bot');
const messageBotSender = botModule.messageSender;
const photoBotSender = botModule.photoSender;

function helpHandler() {
  console.log(
    '\n',
    'Usage: app [option] | [command]\n',
    '\n',
    'Options:\n',
    '-V | --version            Display number of app version.\n',
    '-h | --help               Display help for commands.\n',
    '\n',
    'Commands:\n',
    'message | m <message>     Send message to Telegram Bot.\n',
    'photo | p <path>          Send photo to Telegram Bot. Just drag-and-drop photo after p-flag.\n',
  );
}

function sendMessage(text) {
  messageBotSender(text);
}

function sendPhoto(path) {
  photoBotSender(path);
}

module.exports = {
  helpHandler,
  sendMessage,
  sendPhoto
}