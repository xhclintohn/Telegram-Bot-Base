# Telegram Bot Base Template

This is a simple, open-source template for building a Telegram bot using Node.js and the Telegraf library. It's designed to be easy to understand, customize, and run in any environment where Node.js is installed (e.g., local machine, VPS, Heroku, or other cloud platforms).

## Features
- Basic commands: `/start`, `/help`, and an admin-only `/admin` command.
- Configuration via `config.js` for sensitive data like bot token and owner ID.
- Clear comments in the code to guide customization.
- Runs with minimal dependencies.

## Prerequisites
- Node.js (version 14 or higher recommended). Download from [nodejs.org](https://nodejs.org/).
- A Telegram bot token: Create a bot via [BotFather](https://t.me/botfather) on Telegram.
- Your Telegram user ID (for admin access): Use a bot like [userinfobot](https://t.me/userinfobot) to get it.

## Setup and Running
1. **Clone or Download the Repo**:
   - If using Git: `git clone <your-repo-url>`.
   - Or download the ZIP from GitHub.

2. **Install Dependencies**:
   - Open a terminal in the project directory.
   - Run: `npm install`.
   - This installs Telegraf (the only required library).

3. **Configure the Bot**:
   - Open `config.js`.
   - Replace `'YOUR_BOT_TOKEN_HERE'` with your actual Telegram bot token.
   - Replace `'YOUR_TELEGRAM_ID_HERE'` with your Telegram user ID (as a number, e.g., 123456789).
   - Save the file.

4. **Run the Bot**:
   - In the terminal: `node bot.js`.
   - The bot should start polling and log "Bot is running!" to the console.
   - Test it by messaging your bot on Telegram.

5. **Deploy to Any Environment**:
   - **Local Machine**: Follow steps above.
   - **VPS/Server (e.g., AWS, DigitalOcean)**: SSH in, install Node.js, clone the repo, and run as above. Use tools like PM2 (`npm install -g pm2; pm2 start bot.js`) for production.
   - **Heroku**: Create a Heroku app, push the repo, set env vars (instead of config.js: set `BOT_TOKEN` and `OWNER_ID` in Heroku settings), and use a Procfile (add one: `echo "worker: node bot.js" > Procfile`).
   - **Other Clouds (e.g., Vercel, Render)**: Adapt for serverless if needed, but this is a polling bot so it needs a persistent process.
   - For env vars alternative: Modify `bot.js` to use `process.env.BOT_TOKEN` and `process.env.OWNER_ID` for platforms that prefer env vars over files.

6. **Customizing**:
   - Add new commands in `bot.js` by following the examples (e.g., `bot.command('newcmd', ...)`).
   - See comments in `bot.js` for more guidance.
   - Keep sensitive data in `config.js`—it's ignored by `.gitignore`.

## Commands
- `/start`: Greets the user.
- `/help`: Lists available commands.
- `/admin`: Admin-only command (replies only to the owner ID in config).

## Troubleshooting
- Error: "Missing token"? Check `config.js`.
- Bot not responding? Ensure it's running and check console logs.
- For production, handle errors and restarts.



Feel free to fork and contribute!