import db from './db.json';
import * as builder from './builder.js';

class Processor {
  constructor(bot) {
    this.bot = bot;
  }

  _help(message) {
    message.reply(
      "Ask me a question like: \n" + 
      "What is rain ?\n" +
      "Show me level 2 Kanji\n"
    );
  }

  _showByLevel(message) {
    const [level] = message.match;
    const kanji = db.filter(x => x.references.grade == level).map(x => x.kanji.character);
    message.react("+1");
    message.reply(kanji.toString());
  }

  _showDetailKanji(message) {
    const [meaning] = message.match;
    const kanji = db.filter(x => x.kanji.meaning.english == meaning);
    const text = builder.generate(kanji[0]);

    message.react("+1");
    message.reply(text);
  }

  listenAndProcess() {
    this.bot.command('level <number>', this._showByLevel);
    this.bot.command('what is <word>', this._showDetailKanji);
    this.bot.listen(/help/i, this._help);
  }
}
export default Processor