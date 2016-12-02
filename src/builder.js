export function generate(word) {
	if(word.isArray) {
		const kanji = word[0].kanji;
		const examples = word[0].examples;
	}
	const kanji = word.kanji;
	const examples = word.examples;
	
	const text = "Character: " + kanji.character + "\n" +
		"Meaning: " + kanji.meaning.english + "\n" +
		"Onyomi: " + kanji.onyomi.katakana + "\n" +
		"Kunyomi: " + kanji.kunyomi.hiragana + "\n" +
		"Video: " + kanji.video.mp4 + "\n" +
		"Example: " + examples.map(e => e.japanese + ": " + e.meaning.english + "\n");
	return text;
}