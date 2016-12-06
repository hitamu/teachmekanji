import _ from 'lodash';
import db from '../data/db.json';

class Repository {
	constructor(data = db) {
		if(_.isEmpty(data)) throw new Error("Data must be valid.");
		this.entities = data;
	}

	getAll() {
		return this.entities;
	}

  getByCharacter(char) {
    return this.entities.filter(x => x.kanji.character === char);
  }

	getByGrade(level) {
		return this.entities.filter(x => x.references.grade === level);
	}

  getByKunyomi(str) {
    return this.entities.filter(x => x.kanji.kunyomi.romaji === str);
  }

  getByOnyomi(str) {
    return this.entities.filter(x => x.kanji.onyomi.romaji === str);
  }

  getBySpelling(str) {
		return _.union(this.getByKunyomi(str), this.getByOnyomi(str));
	}

  getByMeaning(str) {
    const withMeaning = meanings => _.includes(meanings.replace(/\s/g, "").split(","), str);
    return this.entities.filter(x => withMeaning(x.kanji.meaning.english));
  }
}

export default Repository