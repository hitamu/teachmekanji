export function generate(word) {
	let kanji = word.kanji;
	let examples = word.examples;	
	
	const text = "Character: " + kanji.character + "\n" +
		"Meaning: " + kanji.meaning.english + "\n" +
		"Onyomi: " + kanji.onyomi.katakana + "\n" +
		"Kunyomi: " + kanji.kunyomi.hiragana + "\n" +
		"Video: " + kanji.video.mp4 + "\n" +
		"Example: " + examples.map(e => e.japanese + ": " + e.meaning.english + "\n");
	return text;
}