'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selfCalling = function selfCalling() {
	var options = {
		host: 'https://teachmekanji.herokuapp.com',
		port: 80
	};
	_http2.default.get(options, function (res) {
		console.log(res);
		res.on('data', function (chunk) {
			try {
				// optional logging... disable after it's working
				console.log("HEROKU RESPONSE: " + chunk);
			} catch (err) {
				console.log(err.message);
			}
		}).on('error', function (err) {
			console.log("Error: " + err.message);
		});
	});
};

var keepAlive = function keepAlive() {
	var duration = 20 * 60 * 1000;
	setInterval(selfCalling, duration);
};

keepAlive();