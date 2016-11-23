'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _slackbotApi = require('slackbot-api');

var _slackbotApi2 = _interopRequireDefault(_slackbotApi);

var _db = require('./db.json');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = process.env.SLACK_TOKEN;
var bot = new _slackbotApi2.default({ token: token });
var port = process.env.PORT || 3000;

bot.command('show me level <number>', function (message) {
    var _message$match = _slicedToArray(message.match, 1),
        level = _message$match[0];

    var kanji = _db2.default.filter(function (x) {
        return x.references.grade == level;
    }).map(function (x) {
        return x.kanji.character;
    });
    message.reply(kanji.toString());
});

bot.command('what is <word>', function (message) {
    var _message$match2 = _slicedToArray(message.match, 1),
        meaning = _message$match2[0];

    var kanji = _db2.default.filter(function (x) {
        return x.kanji.meaning.english == meaning;
    }).map(function (x) {
        return x.kanji.character;
    });
    message.reply(kanji.toString());
});

bot.listen(/help/i, function (message) {
    message.reply("Ask me a question like: ");
    message.reply('"What is rain"');
    message.reply('"Show me level 2 Kanji"');
});

_http2.default.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
}).listen(port);

console.log('Server running');