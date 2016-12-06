import Repository from './repository';
import * as builder from './builder';

class Processor {
  constructor(bot) {
    this.bot = bot;
    this.repo = new Repository();
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
    const result = builder.generateDetailOf(kanji);

    message.react("+1");
    message.reply(`Here your are`, result);
  }

  _showBySpelling(message) {
    const [spelling] = message.match;
    const repo = new Repository();
    const kanji = repo.getBySpelling(spelling);
    const result = builder.generateList(kanji);

    message.react("+1");
    message.reply("Here your are", result);
  }

  _showByLevel(message) {
    const [level] = message.match;
    const repo = new Repository();
    const kanji = repo.getByGrade(level);
    const result = builder.generateList(kanji);

    message.react("+1");
    message.reply("Here your are", result);
  }

  _showByMeaning(message) {
    const self = this;
    const [meaning] = message.match;
    const repo = new Repository();
    const [kanji] = repo.getByMeaning(meaning);
    const result = builder.generateDetailOf(kanji);

    message.react("+1");
    message.reply(`Here your are`, result);
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