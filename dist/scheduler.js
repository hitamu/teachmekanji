"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSchedule = require("node-schedule");

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scheduler = function () {
	function Scheduler(bot) {
		_classCallCheck(this, Scheduler);

		this.bot = bot;
	}

	_createClass(Scheduler, [{
		key: "setTime",
		value: function setTime(hour, minute) {
			var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
			var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

			this.rule = new _nodeSchedule2.default.RecurrenceRule();
			this.rule.dayOfWeek = new _nodeSchedule2.default.Range(start, end);
			this.rule.hour = hour;
			this.minute = minute;
		}
	}, {
		key: "run",
		value: function run() {
			var _this = this;

			_nodeSchedule2.default.scheduleJob(this.rule, function () {
				var msg = "Hello";
				_this.bot.sendMessage("thu_nx", msg);
			});
		}
	}]);

	return Scheduler;
}();

exports.default = Scheduler;