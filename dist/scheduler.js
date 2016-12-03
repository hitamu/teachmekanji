'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _db = require('./db.json');

var _db2 = _interopRequireDefault(_db);

var _message = require('./message.js');

var builder = _interopRequireWildcard(_message);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scheduler = function () {
  function Scheduler(bot) {
    _classCallCheck(this, Scheduler);

    this.bot = bot;
    this.rule = new _nodeSchedule2.default.RecurrenceRule();
  }

  _createClass(Scheduler, [{
    key: 'setTime',
    value: function setTime(hour, minute) {
      var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

      this.rule.dayOfWeek = new _nodeSchedule2.default.Range(start, end);
      this.rule.hour = hour;
      this.minute = minute;
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      _nodeSchedule2.default.scheduleJob(this.rule, function () {
        var kanji = _this.bot.random(_db2.default.filter(function (x) {
          return x.references.grade == 1;
        }));
        var text = builder.generate(kanji);
        _this.bot.sendMessage("thu_nx", text);
      });
    }
  }]);

  return Scheduler;
}();

exports.default = Scheduler;