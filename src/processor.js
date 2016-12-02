import db from './db.json';

class Processor {
	constructor(bot) {
		this.bot = bot;
	}

	_help(message) {
		message.reply("Ask me a question like: ");
		message.reply('"What is rain"');
		message.reply('"Show me level 2 Kanji"');
	}

	_showByLevel(message) {
		const [level] = message.match;
		const kanji = db.filter(x => x.references.grade == level).map(x => x.kanji.character);
		message.react("+1");
		message.reply(kanji.toString());
	}

	_showDetailKanji(message) {
		const [meaning] = message.match;
		const kanji = db.filter(x => x.kanji.meaning.english == meaning).map(x => x.kanji.character);
		message.react("+1");
		message.reply(kanji.toString());
	}

	listenAndProcess() {
		this.bot.command('level <number>', this._showByLevel);
		this.bot.command('what is <word>', this._showDetailKanji);
		this.bot.listen(/help/i, this._help);
	}
}
export default Processor