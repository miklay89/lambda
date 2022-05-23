const { Command } = require('commander');
const program = new Command();
const helperModule = require('./helpers/helpers');
const helpHandler = helperModule.helpHandler;
const sendMessage = helperModule.sendMessage;
const sendPhoto = helperModule.sendPhoto;

// Options
program
  .option('-h, --help','help for user', helpHandler)
  .version('1.0')

// Command send message
program
  .command('message <message>')
  .description('Send message to Telegram Bot')
  .action(message => {
    sendMessage(message);
  })
program
  .command('m <message>')
  .description('Send message to Telegram Bot')
  .action(message => {
    sendMessage(message);
  })

// Command send photo
program
  .command('photo <path>')
  .description('Send photo to Telegram Bot.')
  .action(path => {
    sendPhoto(path);
  })

program
  .command('p <path>')
  .description('Send photo to Telegram Bot.')
  .action(path => {
    sendPhoto(path);
  })

program.parse(process.argv);