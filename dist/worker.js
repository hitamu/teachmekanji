'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Worker = function () {
  function Worker() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.HOST;
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.PORT;
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config.DURATION;

    _classCallCheck(this, Worker);

    this.host = host;
    this.port = port;
    this.duration = duration;
  }

  _createClass(Worker, [{
    key: '_log',
    value: function _log() {
      var now = new Date();
      console.log('Self called at ' + now.toString());
    }
  }, {
    key: 'selfCalling',
    value: function selfCalling() {
      this._log();
      _http2.default.get({ host: this.host, port: this.port });
    }
  }, {
    key: 'keepALive',
    value: function keepALive() {
      setInterval(this.selfCalling, this.duration);
    }
  }]);

  return Worker;
}();

exports.default = Worker;