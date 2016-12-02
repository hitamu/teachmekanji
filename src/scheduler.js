import Schedule from 'node-schedule';

class Scheduler {
	constructor(bot) {
		this.bot = bot;
	}
	
	setTime(hour, minute, start = 1, end = 5) {
		this.rule = new Schedule.RecurrenceRule();
		this.rule.dayOfWeek = new Schedule.Range(start, end);
		this.rule.hour = hour;
		this.minute = minute;
	}

	run() {
		Schedule.scheduleJob(this.rule, () => {
    		const msg = "Hello";
    		this.bot.sendMessage("thu_nx", msg);
		});
	}
}

export default Scheduler