import Schedule from 'node-schedule';
import db from '../data/db.json';
import * as builder from './message.js';

class Scheduler {
  constructor(bot) {
    this.bot = bot;
    this.rule = new Schedule.RecurrenceRule();
  }
  
  setTime(hour, minute, start = 1, end = 5) {
    this.rule.dayOfWeek = new Schedule.Range(start, end);
    this.rule.hour = hour;
    this.minute = minute;
  }

  run() {
    Schedule.scheduleJob(this.rule, () => {
      const kanji = this.bot.random(db.filter(x => x.references.grade == 1));
      const text = builder.generate(kanji);
        this.bot.sendMessage("thu_nx", text);
    });
  }
}

export default Scheduler