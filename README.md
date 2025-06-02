# Minecraft Bot

## Features

- **Random Username Generation**: Each bot connection uses a unique, randomly generated username.
- **Auto-Reconnect**: Automatically reconnects the bot after 10 minutes if disconnected.
- **Sleep at Night**: Attempts to sleep in the nearest bed if it's night in Minecraft.
- **Error Handling**: Disconnects and attempts to reconnect if the bot encounters errors or is kicked.
- **Flexible Configurations**: Easily modify server address, port, and Minecraft version.

## Instructions

### Setup

1. **Install Node.js**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Create a Project Directory**
   - Create a directory for your project and navigate into it:
     ```sh
     mkdir minecraft-bot
     cd minecraft-bot
     ```

3. **Initialize a Node.js Project**
   - Initialize a new Node.js project and install dependencies:
     ```sh
     npm init -y
     npm install mineflayer node-schedule
     ```

4. **Use The Bot Script**
   - Download the file file named `bot.js`

5. **Run the Bot**
   - Run the script using Node.js:
     ```sh
     node bot.js
     ```

### Replit Setup

1. **Create a Replit Account**
   - Sign up or log in at [Replit](https://replit.com/).

2. **Create a New Repl**
   - Click on “Create Repl” and select the "Node.js" template.

3. **Upload the Files**
   - Upload your `bot.js` file to the Replit environment. You can use the "Upload File" button on the left panel.

4. **Install Dependencies**
   - Open the Replit Shell (bottom panel) and run:
     ```sh
     npm install mineflayer node-schedule
     ```

5. **Run the Bot**
   - In the Shell, start the bot by running:
     ```sh
     node bot.js
     ```

### Notes

- Ensure your server allows bot connections and does not have anti-bot measures.
- Adjust the Minecraft server `host`, `port`, and `version` in `bot.js` as needed.

### Troubleshooting

- **Connection Errors**: Verify server address and port. Check server logs for more details.
- **Sleeping Issues**: Ensure it's night in the game and the bot can access a bed.
