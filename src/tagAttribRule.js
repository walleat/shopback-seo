/**
This Rule use to valid the tag's attribute exist or not
**/
const util = require('util');
const SeoRule = require('./seoRule');

function TagAttribRule(tagName,attribute){
  this.tagName = tagName;
  this.mustHaveAttributes = attribute;
  this.count = 0;
};

util.inherits(TagAttribRule,SeoRule);

TagAttribRule.prototype.process = function(tagName,attribs) {
  if(tagName != this.tagName) return ;
  var isAttributesNotExist = attribs[this.mustHaveAttributes] == undefined;
  if(isAttributesNotExist){
    this.count ++;
  }
  return this.count;
};

TagAttribRule.prototype.result = function(){
  return util.format('This HTML has %s <%s> tag without %s attribtes.\n',this.count,this.tagName,this.mustHaveAttributes);
}

module.exports = TagAttribRule;
