const express = require('express');
const bodyParser = require('body-parser');
const mineflayer = require('mineflayer');

const app = express();
const bots = []; // قائمة البوتات المتصلة

app.use(bodyParser.json());

app.post('/start-bot', (req, res) => {
  const { botName, serverIP, port } = req.body;

  try {
    const bot = mineflayer.createBot({
      host: serverIP,
      port: parseInt(port),
      username: botName,
      version: '1.21.5',    // 💡 تأكد أن السيرفر يدعم هذا الإصدار
      auth: 'offline'       // ✅ وضع المكرك
    });

    bot.on('login', () => {
      console.log(`✅ البوت "${botName}" دخل السيرفر ${serverIP}:${port}`);
    });

    bot.on('end', () => {
      console.log(`❌ البوت "${botName}" تم فصله`);
    });

    bot.on('error', err => {
      console.log(`⚠️ خطأ: ${err.message}`);
    });

    bots.push(bot);
    res.json({ message: `🟢 البوت "${botName}" يحاول دخول ${serverIP}:${port}` });
  } catch (e) {
    res.status(500).json({ message: '❌ فشل في تشغيل البوت: ' + e.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 السيرفر شغال على http://localhost:3000');
});
