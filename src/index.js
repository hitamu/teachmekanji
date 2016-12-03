import http from 'http';
import SlackBot from 'slackbot-api';
import Worker from './worker.js';
import Scheduler from './scheduler.js';
import Processor from './processor.js';
require('babel-core/register');

const token = process.env.SLACK_TOKEN;
const slackbot = new SlackBot({ token: token });

/* Keep Heroku instance doesn't idle */
const worker = new Worker();
worker.keepALive();

/* Send Kanji word every day at scheduled time */
const scheduler = new Scheduler(slackbot);
scheduler.setTime(17, 15);
scheduler.run();

/* Listen and answer question */
const processor = new Processor(slackbot);
processor.listenAndProcess();


const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is running');

}).listen(port);
