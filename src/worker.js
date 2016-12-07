import http from 'http';
import {HOST, PORT, DURATION} from './config.js';

class Worker {
  constructor(host = HOST, port = PORT, duration = DURATION) {
    this.host = host;
    this.port = port;
    this.duration = duration;
  }

  selfCalling() {
    http.get({host: this.host, port: this.port});

    let now = new Date();
    console.log(`Self called at ${now.toString()}`);
  }

  keepALive() {
    setInterval(this.selfCalling, this.duration);
  }
}

export default Worker