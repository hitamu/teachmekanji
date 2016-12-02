import http from 'http';
import {HOST, PORT, DURATION} from './config.js';

class Worker {
	constructor(host = HOST, port = PORT, duration = DURATION) {
		this.host = host;DURATION
		this.port = port;
		this.duration = duration;
	}

	_log() {
		let now = new Date();
		console.log(`Self called at ${now.toString()}`);
	}

	selfCalling() {
		this._log();
		http.get({host: this.host, port: this.port});
	}

	keepALive() {
		setInterval(this.selfCalling, this.duration);
	}
}

export default Worker