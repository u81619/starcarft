const express = require('express');
const bodyParser = require('body-parser');
const mineflayer = require('mineflayer');

const app = express();
const bots = [];

app.use(bodyParser.json());

app.post('/start-bot', (req, res) => {
  const { botName, serverIP, port } = req.body;

  console.log(`🚀 محاولة تشغيل بوت: ${botName} على ${serverIP}:${port}`);

  try {
    const bot = mineflayer.createBot({
      host: serverIP,
      port: parseInt(port),
      username: botName,
      version: '1.21.5',
      auth: 'offline'
    });

    bot.once('login', () => {
      console.log(`✅ البوت "${botName}" دخل السيرفر`);
    });

    bot.once('spawn', () => {
      res.json({ message: `🟢 البوت "${botName}" دخل السيرفر بنجاح` });
    });

    bot.on('error', (err) => {
      console.error(`❌ خطأ في البوت "${botName}":`, err.message);
      res.status(500).json({ message: '❌ خطأ: ' + err.message });
    });

    bot.on('end', () => {
      console.log(`📤 تم فصل البوت "${botName}"`);
    });

    bots.push(bot);
  } catch (e) {
    console.error('❌ خطأ غير متوقع:', e.message);
    res.status(500).json({ message: '❌ خطأ غير متوقع: ' + e.message });
  }
});

app.listen(3000, () => {
  console.log('🌐 السيرفر شغال على http://localhost:3000');
});
