"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.generate = generate;
function generate(word) {
	if (word.isArray) {
		var _kanji = word[0].kanji;
		var _examples = word[0].examples;
	}
	var kanji = word.kanji;
	var examples = word.examples;

	var text = "Character: " + kanji.character + "\n" + "Meaning: " + kanji.meaning.english + "\n" + "Onyomi: " + kanji.onyomi.katakana + "\n" + "Kunyomi: " + kanji.kunyomi.hiragana + "\n" + "Video: " + kanji.video.mp4 + "\n" + "Example: " + examples.map(function (e) {
		return e.japanese + ": " + e.meaning.english + "\n";
	});
	return text;
}