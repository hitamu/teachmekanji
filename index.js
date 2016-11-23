import express from 'express';
import Bot from 'slackbot-api';
import db from './db.json';

let app = express();

const token = process.env.SLACK_TOKEN;
const bot = new Bot({ token: token });

bot.command('show me level <number>', message => {
    const [level] = message.match;
    const kanji = db.filter(x => x.references.grade == level).map(x => x.kanji.character);
    message.reply(kanji.toString());
});

bot.command('what is <word>', message => {
    const [meaning] = message.match;
    const kanji = db.filter(x => x.kanji.meaning.english == meaning).map(x => x.kanji.character);
    message.reply(kanji.toString());
});

bot.listen(/help/i, message => {
    message.reply("Ask me a question like: ");
    message.reply('"What is rain"');
    message.reply('"Show me level 2 Kanji"');
});

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
     res.send("Bot is running")
})
app.listen(port, () => {
     console.log("Running application");
})
