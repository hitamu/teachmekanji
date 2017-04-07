import _ from 'lodash';
import db_en from '../data/db.json';
import db_vi from '../data/db-vi.json';

class Repository {
  // TODO: Need to implement interface this one
  // Temporary dirty code
	constructor(lang = "en") {
    if (lang == "vi") {
      this.entities = db_vi;
    } else {
      this.entities = db_en;
    }
	}

	getAll() {
    return this.entities;
	}

  getByCharacter(char) {
    return this.entities.filter(x => x.kanji.character == char);
  }

	getByGrade(level) {
    return this.entities.filter(x => x.references.grade == level);
	}

  getByKunyomi(str) {
    return this.entities.filter(x => _.includes(this.toArray(x.kanji.kunyomi.romaji), str));
  }

  getByOnyomi(str) {
    return this.entities.filter(x => _.includes(this.toArray(x.kanji.onyomi.romaji), str));
  }

  getBySpelling(str) {
		return _.union(this.getByKunyomi(str), this.getByOnyomi(str));
	}

  getByMeaning(str) {
    const withMeaning = meanings => _.includes(this.toArray(meanings), str);
    return this.entities.filter(x => withMeaning(x.kanji.meaning.english));
  }

  toArray(str) {
    return str.replace(/\s/g, "").split(",");
  }
}

export default Repository