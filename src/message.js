
function hl(text) { return "`" + text + "`" };

export function generate(word) {
  let kanji = word.kanji;
  let examples = word.examples; 
  
  const text = "Character: " + kanji.character + "\n" +
    "Meaning: `" + (kanji.meaning.english) + "`\n" +
    "Onyomi: " + hl(kanji.onyomi.katakana) + "\n" +
    "Kunyomi: " + hl(kanji.kunyomi.hiragana) + "\n" +
    "Video: " + kanji.video.mp4 + "\n" +
    "Example: \n" + examples.map(e => e.japanese + ": " + e.meaning.english + "\n");
  return text;
}

export function withAtt(word, bot) {
	const attachments = new bot.Attachments();
	attachments.good("Ok");
  console.log(attachments);
	const options = {
		websocket: false,
		attachments: attachments
	}
	return {text: "Att", options: options};
}
