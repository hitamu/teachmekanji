import 'mocha';
import chai from 'chai';
import Repository from '../src/repository';
import _ from 'lodash';

chai.should();
let expect = chai.expect;

describe('Repository', () => {
  describe('constructor', () => {
    it('should throw exception when apply wrong data', done => {
      const data = [];
      const badConstruction = () => {new Repository(data)};
      expect(badConstruction).to.throw("Data must be valid.");
      done();
    })
  })

  describe('getAll', () => {
    it('should return all kanji correctly by default', done => {
      const repo = new Repository();
      repo.getAll().should.have.length.above(0);
      done();
    })
  })

  describe('getByCharacter', () => {
    it('should return correct kanji', done => {
      const repo = new Repository();
      const result = repo.getByCharacter("一");
      result.should.have.length(1);
      _.first(result).kanji.character.should.equal("一");
      done();
    })
  })

  describe('getByGrade', () => {
    it('should return kanjies which have correct grade', done => {
      const repo = new Repository();
      repo.getByGrade("1").should.have.length(80);
      done();
    })
  })

  describe('getBySpelling', () => {
    it('should return kanjies which have correct spelling', done => {
      const repo = new Repository();
      const result = repo.getBySpelling("hito");
      result.should.have.length.above(1);
      done();
    })

    it('should return kanjies which has multiple spelling', done => {
      const repo = new Repository();
      const result = repo.getBySpelling("ame");
      result.should.have.length.above(1);
      done();
    })
  })

  describe('getByMeaning', () => {
    it('should return kanji which has correct meaning', done => {
      const repo = new Repository();
      const result = repo.getByMeaning("rain");
      result.should.have.length(1);
      _.first(result).kanji.meaning.english.should.equal("rain");
      done();
    })

    it('should return kanji when it has multiple meaning', done => {
      const repo = new Repository();
      const result = repo.getByMeaning("metal");
      const meaning = _.first(result).kanji.meaning.english;
      meaning.should.contain('gold');
      meaning.should.contain('money');
      done();
    })
  })
})