/*
This rule used to check occurrence of tag in the input html.
*/
const util = require('util');
const SeoRule = require('./seoRule');

function TagMaxRule(tagName,max){
  this.tagName = tagName;
  this.count = 0;
  this.max =max;
};

util.inherits(TagMaxRule,SeoRule);

TagMaxRule.prototype.process = function(tagName) {
  // if the tag not equal to the specified value, return directly.
  if(tagName != this.tagName) return ;
  this.count ++;
  return this.count;
};

TagMaxRule.prototype.result = function(){
  if(this.count > this.max){
      return util.format('This HTML have more than %s <%s> tag.\n',this.max,this.tagName);
  }
  return "";
};

module.exports = TagMaxRule;
