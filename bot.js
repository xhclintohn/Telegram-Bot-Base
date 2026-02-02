// bot.js - Main file for the Telegram bot.
const { Telegraf } = require('telegraf');
const config = require('./config');  // Import config for token and owner ID.

// Debug: Check if config and token are loaded
console.log('Config loaded:', !!config);
console.log('Bot token exists:', !!config.botToken);
console.log('Bot token length:', config.botToken ? config.botToken.length : 'NO TOKEN');

// Validate token format
if (!config.botToken || !config.botToken.includes(':')) {
  console.error('ERROR: Invalid bot token format!');
  console.error('Token should be in format: "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"');
  console.error('Get a new token from @BotFather on Telegram');
  process.exit(1);
}

// Initialize the bot with the token from config.
const bot = new Telegraf(config.botToken, {
  telegram: {
    // Optional: Uncomment if you need to use a proxy
    // agent: new (require('socks-proxy-agent'))('socks5://127.0.0.1:1080')
  }
});

// Error handling: Log any errors.
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
});

// Basic command: /start
bot.command('start', (ctx) => {
  ctx.reply('Hello! This is a bot template. Use /help for more info.');
});

// Basic command: /help
bot.command('help', (ctx) => {
  ctx.reply('Available commands:\n/start - Greet\n/help - This list\n/admin - Admin only (if you are the owner)');
});

// Admin command: /admin - Only responds if the user is the owner.
bot.command('admin', (ctx) => {
  if (config.ownerId && ctx.from.id === parseInt(config.ownerId)) {
    ctx.reply('Admin access granted! This is a template admin command.');
  } else {
    ctx.reply('Sorry, you are not the admin.');
  }
});

// Add a test command to verify bot is working
bot.command('ping', (ctx) => {
  ctx.reply('🏓 Pong! Bot is working.');
});

// Try to get bot info before launching (debug)
bot.telegram.getMe()
  .then(botInfo => {
    console.log('Bot info fetched successfully:', botInfo.username);
  })
  .catch(err => {
    console.error('FAILED to get bot info. Please check:');
    console.error('1. Bot token is correct');
    console.error('2. Internet connection is working');
    console.error('3. No firewall blocking Telegram API');
    console.error('Error details:', err.message);
    process.exit(1);
  });

// Start the bot with better error handling
async function startBot() {
  try {
    console.log('Starting bot with token starting with:', config.botToken.substring(0, 10) + '...');
    
    await bot.launch();
    console.log('✅ Bot is running successfully!');
    console.log('Bot username:', (await bot.telegram.getMe()).username);
    
  } catch (error) {
    console.error('❌ Failed to launch bot:', error.message);
    console.error('Full error:', error);
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
      console.error('\n=== TROUBLESHOOTING ===');
      console.error('1. Your bot token is INVALID or expired');
      console.error('2. Go to @BotFather on Telegram and get a NEW token');
      console.error('3. Make sure token format is: numbers:letters');
      console.error('4. Check config.js has the correct token');
    }
    
    process.exit(1);
  }
}

// Graceful stop on process termination
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Start the bot
startBot();