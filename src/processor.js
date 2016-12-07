import Repository from './repository';
import * as builder from './builder';
import _ from 'lodash';

class Processor {
  constructor(bot) {
    this.bot = bot;
    this.repo = new Repository();
  }
  
  _reply(arr, ifNonEmpty, message) {
    return _.isEmpty(arr) ? this._replyNotFound(message) : ifNonEmpty(arr, message);
  }

  _replyDetail(kanji, message) {
    const result = builder.generateDetailOf(kanji);

    message.react("+1");
    message.reply(`Here your are`, result);
  }

  _replyList(kanji, message) {
    const result = builder.generateList(kanji);

    message.react("+1");
    message.reply("Here your are", result);
  }

  _replyNotFound(message) {
    message.react("disappointed");
    message.reply("Sorry, I could not find out what you wanted.");
  }

  _showByKanji = (message) => {
    const [char] = message.match;
    const [kanji] = this.repo.getByCharacter(char);
    this._reply(kanji, this._replyDetail, message);
  }

  _showBySpelling = (message) => {
    const [spelling] = message.match;
    const kanji = this.repo.getBySpelling(spelling);
    this._reply(kanji, this._replyList, message);
  }

  _showByLevel = (message) => {
    const [level] = message.match;
    const kanji = this.repo.getByGrade(level);
    this._reply(kanji, this._replyList, message);
  }

  _showByMeaning = (message) => {
    const [meaning] = message.match;
    const [kanji] = this.repo.getByMeaning(meaning);
    this._reply(kanji, this._replyDetail, message);
  }

  _showHelp(message) {
    message.reply(
      "-----------------------------\n" +
      "Ask me a question like: \n" + 
      " - What is rain ?\n" +
      " - Show me level 1 Kanji\n" +
      " - Spelling is ame\n" +
      " - Find 雨\n" +
      "-----------------------------\n"
    );
  }


  listenAndProcess() {
    this.bot.listen(/help/i,                this._showHelp);

    this.bot.command('level <number>',      this._showByLevel);
    this.bot.command('what is <word>',      this._showByMeaning);
    this.bot.command('spelling is <word>',  this._showBySpelling);
    this.bot.command('find <string>',       this._showByKanji);
  }
}
export default Processor