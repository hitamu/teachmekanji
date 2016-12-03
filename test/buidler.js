import 'mocha';
import chai from 'chai';
import Builder from '../src/builder';


chai.should();

describe('Builder', () => {
  describe('constructor', () => {
    it('should apply bot object correctly', done => {
      const builder = new Builder("ABC");
      builder.generate().should.equal("ABC");
      done();
    })

  })
})