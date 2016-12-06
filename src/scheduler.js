import Schedule from 'node-schedule';
import * as builder from './builder';
import Repository from './repository';

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
      const repo = new Repository();
      const kanji = this.bot.random(repo.getByGrade(1));
      const result = builder.generateDetailOf(kanji);
        this.bot.sendMessage("thu_nx", "Let's learn this kanji", result);
    });
  }
}

export default Scheduler