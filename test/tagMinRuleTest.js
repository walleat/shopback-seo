const should = require('should');
const TagMinRule = require('../src/tagMinRule');
describe('#test tag min rule', () => {
  it('tag occurrence large than specified value', done =>{
    var tagMinRule = new TagMinRule('a',1);
    var attribs = {};
    var result = tagMinRule.result();
    (result).should.be.exactly("This HTML doesn\'t have 1 <a> tag.\n").and.be.a.String;
    done();
  });

  it('tag occurrence less than specified value', done =>{
    var tagMinRule = new TagMinRule('a',1);
    var attribs = {};
    tagMinRule.process('a',attribs);
    var count = tagMinRule.process('a',attribs);
    (count).should.be.exactly(2).and.be.a.Number;

    var result = tagMinRule.result();
    (result).should.be.exactly("").and.be.a.String;
    done();
  });

  it('tag with attribute occurrence large than specified value', done =>{
    var tagMinRule = new TagMinRule('a',2,'rel','test');
    var attribs = {
      'rel':'test'
    };
    tagMinRule.process('a',attribs);
    tagMinRule.process('a',attribs);
    var count = tagMinRule.process('a',attribs);
    (count).should.be.exactly(3).and.be.a.Number;

    var result = tagMinRule.result();
    (result).should.be.exactly("").and.be.a.String;
    done();
  });

  it('tag with attribute occurrence less than specified value', done =>{
    var tagMinRule = new TagMinRule('a',2,'rel','test');
    var attribs = {
      'rel':'test'
    };
    var count = tagMinRule.process('a',attribs);
    (count).should.be.exactly(1).and.be.a.Number;
    var result = tagMinRule.result();
    (result).should.be.exactly("This HTML doesn't have 2 <a rel='test'> tag.\n").and.be.a.String;
    done();
  });
});
