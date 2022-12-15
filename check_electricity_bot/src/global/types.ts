/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum MessageStatus {
  START = "/start",
  HELP = "/help",
  CHECK = "/check",
  LAST = "/last",
}

export enum MessageText {
  START = "Greeting in check power in your home BOT. For using this bot you need to have linux, and node js. If you need additional instructions, please contact us.",
  HELP = "List of commands:\n/start - start message, \n/help - list of commands (you are here),\n/check - check is your home has power now,\n/last - check last time when your home has power.",
  CHECK_MESSAGE = "Checking is your home has power now:",
  CHECK_VALID = "🔋 - YES!",
  CHECK_INVALID = "🪫 - NO :(",
  LAST = "Last time your home has power at:",
  DEFAULT = "Incorrect input, try /help for view a commands list.",
  ONLINE_NOTIFICATION = "Congrats just now your home has 💡!",
  OFFLINE_NOTIFICATION = "From now your home hasn't power, sorry 🕯️.",
}

export interface IResponse {
  isOnline: boolean;
  timestamp: Date;
}
