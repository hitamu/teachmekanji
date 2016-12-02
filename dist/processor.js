'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('./db.json');

var _db2 = _interopRequireDefault(_db);

var _builder = require('./builder.js');

var builder = _interopRequireWildcard(_builder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Processor = function () {
	function Processor(bot) {
		_classCallCheck(this, Processor);

		this.bot = bot;
	}

	_createClass(Processor, [{
		key: '_help',
		value: function _help(message) {
			message.reply("Ask me a question like: \n" + "What is rain ?\n" + "Show me level 2 Kanji\n");
		}
	}, {
		key: '_showByLevel',
		value: function _showByLevel(message) {
			var _message$match = _slicedToArray(message.match, 1),
			    level = _message$match[0];

			var kanji = _db2.default.filter(function (x) {
				return x.references.grade == level;
			}).map(function (x) {
				return x.kanji.character;
			});
			message.react("+1");
			message.reply(kanji.toString());
		}
	}, {
		key: '_showDetailKanji',
		value: function _showDetailKanji(message) {
			var _message$match2 = _slicedToArray(message.match, 1),
			    meaning = _message$match2[0];

			var kanji = _db2.default.filter(function (x) {
				return x.kanji.meaning.english == meaning;
			});
			var text = builder.generate(kanji);

			message.react("+1");
			message.reply(text);
		}
	}, {
		key: 'listenAndProcess',
		value: function listenAndProcess() {
			this.bot.command('level <number>', this._showByLevel);
			this.bot.command('what is <word>', this._showDetailKanji);
			this.bot.listen(/help/i, this._help);
		}
	}]);

	return Processor;
}();

exports.default = Processor;