<div align="center">

# 🚀 Telegram Bot Base Template

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yourusername/telegram-bot-base/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D14-green.svg)](https://nodejs.org/)
[![Telegraf](https://img.shields.io/badge/Telegraf-4.15.3-orange.svg)](https://telegraf.js.org/)

A simple, open-source, and **fully customizable** Telegram bot template using Node.js and Telegraf. Perfect for beginners and developers who want a clean starting point to build their own bots. No folders, everything in the root directory for maximum simplicity! 🌟

</div>

## 📋 Table of Contents

- [✨ Features](#features)
- [🔧 Prerequisites](#prerequisites)
- [🚀 Quick Start](#quick-start)
  - [Step 1: Setup](#step-1-setup)
  - [Step 2: Configure](#step-2-configure)
  - [Step 3: Run](#step-3-run)
- [☁️ Deployment Guide](#deployment-guide)
  - [Local Machine](#local-machine)
  - [VPS/Server](#vpsserver)
  - [Heroku](#heroku)
  - [Other Platforms](#other-platforms)
- [⚙️ Available Commands](#available-commands)
- [🔧 Customization Tips](#customization-tips)
- [❓ Troubleshooting](#troubleshooting)
- [📝 License](#license)
- [🤝 Contributing](#contributing)
- [📞 Need Help?](#need-help)

---

## ✨ Features

- 🎯 **Minimal & Clean**: No unnecessary folders—everything is in the root directory!
- 🔒 **Secure Configuration**: Sensitive data (bot token, owner ID) stored in `config.js` with clear instructions.
- 🛡️ **Admin Protection**: Built-in owner-only commands using your Telegram ID.
- 📱 **Basic Commands Included**: `/start`, `/help`, and `/admin` as templates to build upon.
- 💬 **User-Friendly**: Extensive comments in code and this README for easy understanding.
- 🌍 **Environment Agnostic**: Runs anywhere Node.js is supported (local, VPS, cloud platforms).
- 📦 **Lightweight Dependencies**: Only Telegraf required—install with `npm install`.

---

## 🔧 Prerequisites

Before diving in, make sure you have:

1. **Node.js** (version 14 or higher) installed. Download from [Node.js](https://nodejs.org/) website.
2. A **Telegram Bot Token**: Create your bot by chatting with [BotFather](https://t.me/botfather) on Telegram.
3. Your **Telegram User ID** (for admin access): Get it from [@userinfobot](https://t.me/userinfobot).

<details>
<summary>💡 Pro Tip: Why these prerequisites?</summary>

Node.js powers the bot, the token authenticates it with Telegram, and your user ID enables secure admin features. No other setup needed!

</details>

---

## 🚀 Quick Start

Getting your bot up and running in under 5 minutes! Follow these steps:

### Step 1: Setup
- Clone or download this repository:
  ```bash
  git clone <your-repo-url>
  cd telegram-bot-base
  ```
- Install dependencies:
  ```bash
  npm install
  ```
  This installs Telegraf—the only library needed.

### Step 2: Configure
- Open `config.js` in your editor.
- Replace the placeholders:
  ```javascript
  botToken: 'YOUR_BOT_TOKEN_HERE',  // ← Paste your actual token here
  ownerId: 'YOUR_TELEGRAM_ID_HERE'  // ← Paste your user ID (e.g., 123456789)
  ```
- **Important**: Never commit real values to GitHub. Use `.gitignore` or environment variables for production.

### Step 3: Run
- Start the bot:
  ```bash
  node bot.js
  ```
- You'll see **"Bot is running!"** in the console.
- Open Telegram, search for your bot, and send `/start` to test!

<details>
<summary>🎉 Success! What next?</summary>

Your bot is live! Check the console for any logs. If it doesn't respond, see [Troubleshooting](#troubleshooting).

</details>

---

## ☁️ Deployment Guide

Ready to go live? Here's how to deploy on various environments:

### Local Machine 💻
- Follow the [Quick Start](#quick-start) above.
- For development, run `node bot.js`. Use Ctrl+C to stop.

### VPS/Server 🖥️
- SSH into your server (e.g., AWS EC2, DigitalOcean).
- Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`.
- Clone the repo, install deps, configure, and run: `node bot.js`.
- For production: Install PM2 globally (`npm i -g pm2`), then `pm2 start bot.js --name "telegram-bot"`.
- Auto-restart on crashes: `pm2 startup`.

### Heroku ☁️
1. Create a free Heroku account and install the CLI.
2. In your project: `heroku create your-bot-name`.
3. Set config as environment variables (safer than config.js):
   ```bash
   heroku config:set BOT_TOKEN=your_actual_token
   heroku config:set OWNER_ID=your_actual_id
   ```
4. Add a `Procfile` (create in root): `echo "worker: node bot.js" > Procfile`.
5. Deploy: `git add . && git commit -m "Deploy" && git push heroku main`.
6. Scale: `heroku ps:scale worker=1`.

**Note**: Update `bot.js` to use `process.env.BOT_TOKEN` and `process.env.OWNER_ID` for Heroku compatibility.

### Other Platforms 🔄
- **Render.com**: Connect your GitHub repo, set env vars, and deploy as a Node.js service.
- **Vercel**: Best for serverless, but adapt for polling (use webhooks via Telegraf docs).
- **Railway or Fly.io**: Similar to Heroku—push repo and set env vars.
- For webhooks (production recommended): See [Telegraf Webhooks Guide](https://telegraf.js.org/#/?id=webhooks).

<details>
<summary>🔒 Security Tip</summary>

Always use environment variables in production. Modify `bot.js` like this:
```javascript
const botToken = process.env.BOT_TOKEN || config.botToken;
const ownerId = process.env.OWNER_ID || config.ownerId;
```

</details>

---

## ⚙️ Available Commands

Your bot comes with these starter commands. Test them in Telegram!

- **/start** 👋: Greets you with a welcome message. Perfect for onboarding users.
- **/help** ❓: Displays a list of all available commands. Easy navigation!
- **/admin** 🔑: Admin-only command. Only responds to the owner ID from config. Customize for broadcasts, stats, etc.

<details>
<summary>💡 Example Output</summary>

Sending `/help` to your bot will reply:  
"Available commands:  
/start - Greet  
/help - This list  
/admin - Admin only (if you are the owner)"

</details>

---

## 🔧 Customization Tips

Make it your own! Here's how:

1. **Add New Commands**: Open `bot.js` and add lines like:
   ```javascript
   bot.command('echo', (ctx) => {
     const message = ctx.message.text.split(' ').slice(1).join(' ');
     ctx.reply(`You said: ${message || 'Nothing!'}`);
   });
   ```
   See the commented example in `bot.js`.

2. **Handle Messages**: For non-command interactions:
   ```javascript
   bot.on('text', (ctx) => {
     ctx.reply(`Echo: ${ctx.message.text}`);
   });
   ```

3. **Inline Keyboards (Buttons!)**: Add interactive buttons:
   ```javascript
   bot.command('buttons', (ctx) => {
     ctx.reply('Choose:', {
       reply_markup: {
         inline_keyboard: [[{ text: 'Button 1', callback_data: '1' }]]
       }
     });
   });
   ```

4. **Error Handling**: Already included—expand in the `bot.catch()` section.

5. **More Features**: Integrate databases, APIs, or schedulers. Check Telegraf docs for advanced usage.

**Pro Tip**: Always test commands in a private chat first!

---

## ❓ Troubleshooting

Running into issues? Let's fix it:

- **"Cannot find module 'telegraf'"**: Run `npm install` again.
- **"Missing token" or bot not starting**: Double-check `config.js` placeholders are replaced.
- **Bot not responding**: Ensure it's running (`node bot.js`) and check console for errors. Verify token with BotFather.
- **Admin command not working**: Confirm your user ID is correct (use @userinfobot).
- **Deployment errors**: For Heroku/others, use env vars instead of config.js.
- **Node.js version issue**: Update to latest LTS via [Node.js](https://nodejs.org/) website.

If stuck, open an issue on GitHub or check [Telegraf Documentation](https://telegraf.js.org/). Or reach out via the contact section below!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-command`).
3. Commit changes (`git commit -m 'Add amazing command'`).
4. Push to branch (`git push origin feature/amazing-command`).
5. Open a Pull Request!

Contributions welcome! Let's make this template even better. ⭐

---

## 📞 Need Help?

Stuck on setup? Need customization advice? I'm here to help! 🚀

<div align="center">

| **Contact Method** | **Details** | **Message Me** |
|--------------------|-------------|----------------|
| 📱 **WhatsApp** | +254 735 342 808 | [![WhatsApp Button](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/254735342808) |
| 💬 **Telegram** | @xhclintonxdd | [![Telegram Button](https://img.shields.io/badge/Telegram-0088cc?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/xhclintonxdd) |

</div>

<div align="center">
<p>📧 Feel free to reach out for bot development support, troubleshooting, or feature ideas!</p>
</div>

<div align="center">

**Built with ❤️ using Telegraf | Questions? Message me on WhatsApp or Telegram!** 🌟

</div>