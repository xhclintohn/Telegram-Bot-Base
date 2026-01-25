// bot.js - Main file for the Telegram bot.
// This uses Telegraf library for simplicity.✅
// Run with: node bot.js

const { Telegraf } = require('telegraf');
const config = require('./config');  // Import config for token and owner ID.

// Initialize the bot with the token from config.
const bot = new Telegraf(config.botToken);

// Error handling: Log any errors.
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
});

// Basic command: /start - Greets the user.
// Customize the message as needed.
bot.command('start', (ctx) => {
  ctx.reply('Hello! This is a bot template. Use /help for more info.');
});

// Basic command: /help - Lists available commands.
// Add more commands here as you expand the bot.
bot.command('help', (ctx) => {
  ctx.reply('Available commands:\n/start - Greet\n/help - This list\n/admin - Admin only (if you are the owner)');
});

// Admin command: /admin - Only responds if the user is the owner.
// This is restricted by checking the user ID against config.ownerId.
// Customize the admin action as needed.
bot.command('admin', (ctx) => {
  if (ctx.from.id === parseInt(config.ownerId)) {
    ctx.reply('Admin access granted! This is a template admin command.');
  } else {
    ctx.reply('Sorry, you are not the admin.');
  }
});

// Add more commands here as templates for users to follow.
// Example: A simple echo command.
// bot.command('echo', (ctx) => {
//   const text = ctx.message.text.split(' ').slice(1).join(' ');
//   ctx.reply(text || 'Nothing to echo!');
// });

// Start the bot in polling mode (long polling for updates).
// For webhooks in production, see Telegraf docs.
bot.launch()
  .then(() => console.log('Bot is running!'))
  .catch((err) => console.error('Failed to launch bot:', err));

// Graceful stop on process termination.
// This helps when deploying or restarting.
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));