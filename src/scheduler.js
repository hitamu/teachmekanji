import Schedule from 'node-schedule';
import * as builder from './builder';
import Repository from './repository';
import {CHANNEL} from './config';

class Scheduler {
  constructor(bot) {
    this.bot = bot;
    this.repo = new Repository();
    this.kanji = this.bot.random(this.repo.getByGrade(1));
    this.rules = [];
  }
  
  _makeRule = (hour, minute, start = 1, end = 5) => {
    let rule = new Schedule.RecurrenceRule();
    
    rule.dayOfWeek = new Schedule.Range(start, end);
    rule.hour = hour;
    rule.minute = minute;
    
    return rule;
  }

  _getRandomKanji = () => {
    this.kanji = this.bot.random(this.repo.getByGrade(1));
  }

  setTime(timeArr) {
    this.rules = timeArr.map(time => this._makeRule(time.hour, time.minute));
  }

  run() {
    // Get random kanji at 08:30 everyday
    Schedule.scheduleJob(this._makeRule(8, 30), this._getRandomKanji);

    // Send message to slack at scheduled time
    this.rules.map(rule => {
      Schedule.scheduleJob(rule, () => {
        let result = builder.generateDetailOf(this.kanji);
        this.bot.sendMessage("thu_nx", "Let's learn this kanji", result);
      })
    })
  }
}

export default Scheduler