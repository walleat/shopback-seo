const fs = require('fs');
const should = require('should');
const TagAttribRule = require('../src/tagAttribRule');
const TagMaxRule = require('../src/tagMaxRule');
const TagMinRule = require('../src/tagMinRule');
const HierarchyRule = require('../src/hierarchyRule');
const SeoValidator = require('../src/seoValidator');
describe('#test seo validator', () => {
  it('input and output are file path, rules construct by constructor and add rule manually', done =>{

    //Construct the specified rule. The <a> have noe rel attribute
    var hrefRule = new TagAttribRule('a','rel');
    //The <a> have noe alt attribute
    var imageRule = new TagAttribRule('img','alt');
    //The <storng> can only occure one time
    var strongCountRule = new TagMaxRule('strong',1);
    //The <h1> can only occure one time
    var h1CountRule = new TagMaxRule('h1',1)
    //The <title> should occure inside <head> tag
    var titleMinRule = new TagMinRule('title',1);
    //The <meta name="descriptions"> should occure inside <head> tag
    var descriptMinRule = new TagMinRule('meta',1,'name','descriptions');
    //The <meta name="keywords"> should occure inside <head> tag
    var keywordsMinRule = new TagMinRule('meta',1,'name','keywords');
    //The <head> construct by the previous 3 rule.
    var hierarchyRule = new HierarchyRule('head',[titleMinRule,descriptMinRule,keywordsMinRule]);


    // var output = fs.createWriteStream(__dirname+'/log/test.log');
    var output = process.stdout;
    var seoValidator = new SeoValidator(__dirname+"/test.html",output);
    // console.log('start');
    seoValidator
    .addRule(hrefRule)
    .addRule(imageRule)
    .addRule(strongCountRule)
    .addRule(h1CountRule)
    .addRule(hierarchyRule)
    .valid();
    // console.log('end');
    done();
  });


  it('input and output are file path, rules construct by object', done =>{
    var output = __dirname+'/log/test.log';
    var seoValidator = new SeoValidator(__dirname+"/test.html",output);

    var rule = [
      {
          "rule":"attrib",
          "tag":"a",
          "attribute":"rel"
      },{
          "rule":"attrib",
          "tag":"img",
          "attribute":"alt"
      },{
          "rule":"tagMax",
          "tag":"strong",
          "max":1
      },{
        "rule":"tagMax",
        "tag":"h1",
        "max":1
      },{
        "rule":"hierarchy",
        "tag":"head",
        "rules":[
            {
              "rule":"tagMin",
              "tag":"title",
              "min":1
            },{
              "rule":"tagMin",
              "tag":"meta",
              "attribute":"name",
              "attributeValue":"descriptions",
              "min":1
            },{
              "rule":"tagMin",
              "tag":"meta",
              "attribute":"name",
              "attributeValue":"keywords",
              "min":1
            }
        ]
      }
    ];


    seoValidator.addRules(rule).valid();
    done();
  });



  it('input is readable stream,output is console,rule construct by object', done =>{
    var output =  process.stdout;
    var rs = fs.createReadStream(__dirname+'/test.html');
    rs.setEncoding('utf8');
    var seoValidator = new SeoValidator(rs,output);
    var rule = [
      {
          "rule":"attrib",
          "tag":"a",
          "attribute":"rel"
      }
    ];
    seoValidator.addRules(rule).valid();
    done();
  });

  it('input is readable stream, output is writable stream,rule construct by object', done =>{
    var rs = fs.createReadStream(__dirname+'/test.html');
    rs.setEncoding('utf8');
    var output = fs.createWriteStream(__dirname+'/log/test.log');
    var seoValidator = new SeoValidator(rs,output);
    var rule = [
      {
          "rule":"attrib",
          "tag":"a",
          "attribute":"rel"
      }
    ];
    seoValidator.addRules(rule).valid();
    done();
  });
});
