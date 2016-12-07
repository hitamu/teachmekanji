import http from 'http';
import {HOST, PORT, DURATION} from './config.js';

class Worker {
  constructor(duration = DURATION, host = HOST, port = PORT) {
    this.host = host;
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
    setInterval(x => this.selfCalling(x), this.duration);
  }
}

export default Worker