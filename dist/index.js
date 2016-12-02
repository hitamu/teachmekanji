'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _slackbotApi = require('slackbot-api');

var _slackbotApi2 = _interopRequireDefault(_slackbotApi);

var _worker = require('./worker.js');

var _worker2 = _interopRequireDefault(_worker);

var _scheduler = require('./scheduler.js');

var _scheduler2 = _interopRequireDefault(_scheduler);

var _processor = require('./processor.js');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = process.env.SLACK_TOKEN;
var slackbot = new _slackbotApi2.default({ token: token });

/* Keep Heroku instance doesn't idle */
var worker = new _worker2.default();
worker.keepALive();

/* Send Kanji word every day at scheduled time */
var scheduler = new _scheduler2.default(slackbot);
scheduler.setTime(17, 15);
scheduler.run();

/* Listen and answer question */
var processor = new _processor2.default(slackbot);
processor.listenAndProcess();

var port = process.env.PORT || 3000;
_http2.default.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
}).listen(port);