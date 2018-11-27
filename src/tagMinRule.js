/*
This rule used to check occurrence of tag in the input html.
*/
const util = require('util');
const SeoRule = require('./seoRule');

function TagMinRule(tagName,min,attribute,value){
  this.tagName = tagName;
  this.attribute = attribute;
  this.value = value;
  this.min = min;
  this.count = 0;
};
util.inherits(TagMinRule,SeoRule);

TagMinRule.prototype.process = function(tagName,attribs) {
  //if tag name is not equal to the specified tag, return directly.
  if(tagName != this.tagName) return 0;
  //if the attribute is undefined, just count the tag occurrence
  if(this.attribute == undefined){
      this.count ++;
  } // if the attribute equal to the specified value.
  else if(attribs[this.attribute] == this.value){
    this.count ++;
  }
  return this.count;
};

TagMinRule.prototype.result = function(){
  // if the tag occurrence lower than the specified minimun, print the pessage;
  if(this.count < this.min){
    return this.attribute == undefined ?
                 util.format("This HTML doesn't have %s <%s> tag.\n",this.min,this.tagName):
                 util.format("This HTML doesn't have %s <%s %s='%s'> tag.\n",this.min,this.tagName,this.attribute,this.value);
  }
  return "";
};

module.exports = TagMinRule;
