# Jackabot - Discord Bot

A simple Discord bot that responds with "hello!" whenever someone mentions its name.

## Setup Instructions

### 1. Create a Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give it a name (e.g., "Jackabot")
4. Go to the "Bot" section
5. Click "Add Bot"
6. Copy the bot token

### 2. Configure the Bot
1. Edit `config.json` and replace the placeholder values:
   - `token`: Your bot token from step 1
   - `clientId`: Your application's client ID
   - `guildId`: Your Discord server ID (optional)

### 3. Set Bot Permissions
1. In the Discord Developer Portal, go to "OAuth2" > "URL Generator"
2. Select scopes: `bot`
3. Select permissions: `Send Messages`, `Read Message History`
4. Use the generated URL to invite the bot to your server

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Bot
```bash
npm start
```

## Usage
Once the bot is running, simply type "jackabot" in any channel and it will respond with "hello!"

## Development
To run with auto-restart on file changes:
```bash
npm run dev
``` 
