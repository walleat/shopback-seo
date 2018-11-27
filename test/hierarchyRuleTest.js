const should = require('should');
const TagAttribRule = require('../src/tagAttribRule');
const TagMaxRule = require('../src/tagMaxRule');
const TagMinRule = require('../src/tagMinRule');
const HierarchyRule = require('../src/hierarchyRule');

describe('#test hierarchy rule', () => {

  it('good head tag ', done =>{
    var titleMinRule = new TagMinRule('title',1);
    //The <meta name="descriptions"> should occure inside <head> tag
    var descriptMinRule = new TagMinRule('meta',1,'name','descriptions');
    //The <meta name="keywords"> should occure inside <head> tag
    var keywordsMinRule = new TagMinRule('meta',1,'name','keywords');
    //The <head> construct by the previous 3 rule.
    var hierarchyRule = new HierarchyRule('head',[titleMinRule,descriptMinRule,keywordsMinRule]);
    var attribs = {};
    hierarchyRule.process('head',attribs);
    attribs = {'name':'descriptions'};
    hierarchyRule.process('meta',attribs);
    attribs = {'name':'keywords'};
    hierarchyRule.process('meta',attribs);
    hierarchyRule.process('title');
    hierarchyRule.end();

    var result = hierarchyRule.result();
    (result).should.be.exactly("").and.be.a.String;

    done();
  });

  it('head tag without <title>', done =>{
    var titleMinRule = new TagMinRule('title',1);
    //The <meta name="descriptions"> should occure inside <head> tag
    var descriptMinRule = new TagMinRule('meta',1,'name','descriptions');
    //The <meta name="keywords"> should occure inside <head> tag
    var keywordsMinRule = new TagMinRule('meta',1,'name','keywords');
    //The <head> construct by the previous 3 rule.
    var hierarchyRule = new HierarchyRule('head',[titleMinRule,descriptMinRule,keywordsMinRule]);
    var attribs = {};
    hierarchyRule.process('head',attribs);
    attribs = {'name':'descriptions'};
    hierarchyRule.process('meta',attribs);
    attribs = {'name':'keywords'};
    hierarchyRule.process('meta',attribs);
    // hierarchyRule.process('title');
    hierarchyRule.end();

    var result = hierarchyRule.result();
    (result).should.be.exactly("This HTML doesn't have 1 <title> tag.\n").and.be.a.String;

    done();
  });

  it('head tag without <meta name="descriptions">', done =>{
    var titleMinRule = new TagMinRule('title',1);
    //The <meta name="descriptions"> should occure inside <head> tag
    var descriptMinRule = new TagMinRule('meta',1,'name','descriptions');
    //The <meta name="keywords"> should occure inside <head> tag
    var keywordsMinRule = new TagMinRule('meta',1,'name','keywords');
    //The <head> construct by the previous 3 rule.
    var hierarchyRule = new HierarchyRule('head',[titleMinRule,descriptMinRule,keywordsMinRule]);
    var attribs = {};
    hierarchyRule.process('head',attribs);
    attribs = {'name':'descriptions'};
    hierarchyRule.process('meta',attribs);
    hierarchyRule.process('title');
    hierarchyRule.end();
    var result = hierarchyRule.result();

    (result).should.be.exactly("This HTML doesn't have 1 <meta name='keywords'> tag.\n").and.be.a.String;


    done();
  });


});
