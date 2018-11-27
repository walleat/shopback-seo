const fs = require('fs');
const stream = require('stream');
const htmlParser = require('htmlparser2');
const SeoRuleFactory = require('./seoRuleFactory');

function SeoValidator(input,output){
  this.input = input;
  this.isSelfOpenFile = isString(output);
  if(this.isSelfOpenFile){
      this.output = fs.createWriteStream(output);
  } else {
      this.output = output;
  }
  this.rules = new Array(0);
  var that = this;
  this.parser = new htmlParser.Parser({
    onopentag: function(name,attribs){
      that.rules.forEach(function(element){
        element.process(name,attribs);
      });
    },
    onclosetag: function(tagname){
      that.rules.forEach(function(element){
        element.end(tagname);
      });
    },
    onend: function(){
      // console.log('onend');
      that.rules.forEach(
        function(element){
          var result = element.result();

          that.output.write(result);
        }
      );
      isString(output) && that.output.end();
    }
  },{decodeEntities:true});

};

SeoValidator.prototype.addRule = function( rule){
  this.rules.push(rule);
  return this;
};

SeoValidator.prototype.addRules = function (rules){
  var that = this;
  rules.forEach(function(element){

    var rule = SeoRuleFactory.createSeoRule(element);
    that.addRule(rule);
  });
  return this;
}

SeoValidator.prototype.valid = function(){
  var that = this;
  if(isReadableStream(this.input)){
    this.input.on('data', function(chunk){
      that.parser.write(chunk);
    });
    this.input.on('end',function(){
      that.parser.end();
    });
    this.input.on('error',function(err){
      console.error(err);
      throw err;
    })
  } else {
    fs.readFile(this.input, function (err, data) {
        if (err) throw err;
        that.parser.write(data.toString());
        that.parser.end();
    });
  }
  // if(this.isSelfOpenFile){
  //   console.log('qq self open file');
  //   this.output.end();
  // }
};


function isReadableStream(obj) {
  return obj instanceof stream.Stream &&
    typeof (obj._read === 'function') &&
    typeof (obj._readableState === 'object');
}

function isString (obj) {
  return (Object.prototype.toString.call(obj) === '[object String]');
}


module.exports = SeoValidator;
