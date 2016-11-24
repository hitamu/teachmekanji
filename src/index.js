import http from 'http';
import Bot from 'slackbot-api';
import db from './db.json';

const token = process.env.SLACK_TOKEN;
const bot = new Bot({ token: token });
const port = process.env.PORT || 3000;

bot.command('show me level <number>', message => {
    const [level] = message.match;
    const kanji = db.filter(x => x.references.grade == level).map(x => x.kanji.character);
    message.react("+1");
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

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is running');

}).listen(port);
