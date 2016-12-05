import * as builder from './message';
import Repository from './repository';

class Processor {
  constructor(bot) {
    this.repo = new Repository();
    this.bot = bot;
  }

  _help(message) {
    message.reply(
      "-----------------------------\n" +
      "Ask me a question like: \n" + 
      " - What is rain ?\n" +
      " - Show me level 2 Kanji\n" +
      " - Spelling is hito\n" +
      " - Find 雨\n" +
      "-----------------------------\n"
    );
  }

  _showByKanji(message) {
    const [char] = message.match;
    const repo = new Repository();
    const [kanji] = repo.getByCharacter(char);
    const text = builder.generate(kanji);

    message.react("+1");
    message.reply(text);
  }

  _showBySpelling(message) {
    const [spelling] = message.match;
    const repo = new Repository();
    const kanji = repo.getBySpelling(spelling);

    message.react("+1");
    message.reply(kanji.map(x => x.kanji.character).toString())
  }

  _showByLevel(message) {
    const [level] = message.match;
    const repo = new Repository();
    const kanji = repo.getByGrade(level);

    message.react("+1");
    message.reply(kanji.toString());
  }

  _showByMeaning(message) {
    const [meaning] = message.match;
    const repo = new Repository();
    const [kanji] = repo.getByMeaning(meaning);
    const text = builder.generate(kanji);

    message.react("+1");
    message.reply(text);
  }

  listenAndProcess() {
    this.bot.command('level <number>',      this._showByLevel);
    this.bot.command('what is <word>',      this._showByMeaning);
    this.bot.command('spelling is <word>',  this._showBySpelling);
    this.bot.command('find <string>',       this._showByKanji);
    
    this.bot.listen(/help/i,                this._help);
  }
}
export default Processor