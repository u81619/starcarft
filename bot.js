const mineflayer = require('mineflayer');
const schedule = require('node-schedule');

function getRandomUsername() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return 'Bot_' + username;
}

function connectBot() {
    const bot = mineflayer.createBot({
        host: 'onlyforlegends.aternos.me', // Replace with your server address
        port: 16911,                        // Replace with your server port
        username: getRandomUsername(),
        version: '1.19.4'                   // Specify the Minecraft version
    });

    bot.on('login', () => {
        console.log(`Bot connected with username: ${bot.username}`);
    });

    bot.on('death', () => {
        console.log('Bot died, respawning...');
        bot.chat('/respawn');  // Send respawn command
    });

    bot.on('end', () => {
        console.log('Bot disconnected, reconnecting in 10 minutes...');
        setTimeout(connectBot, 10 * 60 * 1000); // Reconnect after 10 minutes
    });

    bot.on('error', (err) => {
        console.error('Bot encountered an error:', err);
        bot.end(); // Disconnect the bot if an error occurs
    });

    bot.on('kicked', (reason) => {
        console.log('Bot was kicked from the server:', reason);
        bot.end(); // Disconnect the bot if kicked
    });

    bot.on('time', () => {
        console.log(`Updated Minecraft time: ${bot.time.dayTime}`);
    });

    function sleepAtNight() {
        if (bot.time && bot.time.dayTime !== undefined) {
            const dayTime = bot.time.dayTime;
            console.log(`Current Minecraft time: ${dayTime}`);

            if (dayTime >= 13000 && dayTime < 23000) { // Night time in Minecraft is between 13000 and 23000 ticks
                console.log('It is night. Attempting to sleep...');
                bot.findBed().then(bed => {
                    bot.sleep(bed).catch(err => {
                        console.error('Failed to sleep:', err);
                    });
                }).catch(err => {
                    console.error('No bed found:', err);
                });
            } else {
                console.log('It is not night or a thunderstorm. Bot cannot sleep right now.');
            }
        } else {
            console.log('Minecraft time data is not available.');
        }
    }

    // Schedule the night sleep check
    schedule.scheduleJob('*/1 * * * *', sleepAtNight); // Check every minute
}

// Connect the bot immediately when the script starts
connectBot();
