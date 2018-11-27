const should = require('should');
const TagAttribRule = require('../src/tagAttribRule');
describe('#test tag with attribute rule', () => {
  it('tag with attribute', done =>{
    var tagAttribRule = new TagAttribRule('a','rel');
    var attribs = {
      'rel':'test'
    };
    var count =tagAttribRule.process('a',attribs);
    (count).should.be.exactly(0).and.be.a.Number;
    var result = tagAttribRule.result();
    (result).should.be.exactly("This HTML has 0 <a> tag without rel attribtes.\n").and.be.a.String;
    done();
  });

  it('tag without attribute',done => {
    var tagAttribRule = new TagAttribRule('a','rel');
    var attribs = {};
    var count = tagAttribRule.process('a',attribs);
    (count).should.be.exactly(1).and.be.a.Number;
    var result = tagAttribRule.result();
    (result).should.be.exactly("This HTML has 1 <a> tag without rel attribtes.\n").and.be.a.String;
    done();
   });
});
