import _ from 'lodash';
import {AUTHOR} from './config';


function _generateField(title, value) {
  return {
    "title": `${title}`,
    "value": `${value}`,
    "short": true
  }
}

export function generateList(words) {
  const kanji = words.map(e =>
    _generateField(e.kanji.character, e.kanji.meaning.english)
  );
  const attachments = [
    {
      "fields": kanji,
      "color": "#36a64f",
      "footer": `${AUTHOR}`,
    }
  ];
  const options = {
      "websocket": false,
      "attachments": attachments
  }
  return options;
}

export function generateDetailOf(word) {
  const char = word.kanji.character;
  const video = word.kanji.video.mp4;
  
  const meaning   = `> Meaning: \`${word.kanji.meaning.english}\`\n`;
  const onyomi    = `> Onyomi: \`${word.kanji.onyomi.katakana}\`\n`;
  const kunyomi   = `> Kunyomi: \`${word.kanji.kunyomi.hiragana}\`\n`;
  const kakikata  = `> <${video}|Learn how to write it.>\n`;
  const text = meaning + onyomi + kunyomi + kakikata;

  const examples = word.examples.map(e =>
    _generateField(e.japanese, e.meaning.english)
  );

  const attachments = [
    {
      "title": `${char}`,
      "text": text,
      "fields": examples,
      "color": "#36a64f",
      "footer": `${AUTHOR}`,
      "mrkdwn_in": ["text", "pretext", "fields"]
    }
  ];
	const options = {
      "websocket": false,
	    "attachments": attachments
	}
  return options;
}


export function generateDetail(word) {
  const char = word.kanji;
  
  const meaning   = `> Meaning: \`${word.mean}\`\n`;
  const onyomi    = `> Onyomi: \`${word.on}\`\n`;
  const kunyomi   = `> Kunyomi: \`${word.kun}\`\n`;
  const text = meaning + onyomi + kunyomi;

  const examples = word.examples.map(e =>
    _generateField(e.w + " (" + e.p + ")", e.h + " - " + e.m)
  );

  const attachments = [
    {
      "title": `${char}`,
      "text": text,
      "fields": examples,
      "color": "#36a64f",
      "footer": `${AUTHOR}`,
      "mrkdwn_in": ["text", "pretext", "fields"]
    }
  ];
	const options = {
      "websocket": false,
	    "attachments": attachments
	}
  return options;
}