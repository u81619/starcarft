// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mineflayer = require('mineflayer');

const app = express();
const bots = [];

app.use(bodyParser.json());

app.post('/start-bot', (req, res) => {
  const { botName, serverIP, port } = req.body;

  try {
    const bot = mineflayer.createBot({
      host: serverIP,
      port: parseInt(port),
      username: botName,
      version: '1.21.5' // 💡 نحدد الإصدار هنا
    });

    bot.on('login', () => {
      console.log(`✅ البوت "${botName}" دخل السيرفر ${serverIP}:${port}`);
    });

    bot.on('end', () => {
      console.log(`❌ البوت "${botName}" تم فصله من السيرفر`);
    });

    bot.on('error', err => {
      console.log(`⚠️ خطأ في البوت ${botName}:`, err.message);
    });

    bots.push(bot);
    res.json({ message: `🟢 البوت "${botName}" يحاول الاتصال بـ ${serverIP}:${port}` });
  } catch (e) {
    res.json({ message: 'فشل تشغيل البوت: ' + e.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 الخادم يعمل على http://localhost:3000');
});
