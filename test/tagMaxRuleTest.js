const should = require('should');
const TagMaxRule = require('../src/tagMaxRule');
describe('#test tag max rule', () => {
  it('tag occurrence large than specified', done =>{
    var tagMaxRule = new TagMaxRule('a',2);
    tagMaxRule.process('a');
    tagMaxRule.process('a');
    var count = tagMaxRule.process('a');
    (count).should.be.exactly(3).and.be.a.Number;
    var result = tagMaxRule.result();
    (result).should.be.exactly("This HTML have more than 2 <a> tag.\n").and.be.a.String;
    done();
  });

  it('tag occurrence less than specified',done => {
    var tagMaxRule = new TagMaxRule('a',2);
    tagMaxRule.process('a');
    var count = tagMaxRule.process('a');
    (count).should.be.exactly(2).and.be.a.Number;
    var result = tagMaxRule.result();
    (result).should.be.exactly("").and.be.a.String;
    done();
   });
});
