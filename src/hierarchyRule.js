
/**
HierarchyRule used to check the rules insede the specified tag.
**/
const util = require('util');
const SeoRule = require('./seoRule');

function HierarchyRule(tagName,rules){
  this.tagName = tagName;
  this.rules = rules;
  this.startProcess = false;
};

util.inherits(HierarchyRule,SeoRule);
HierarchyRule.prototype.process = function(tagName,attribs) {
  if(!this.startProcess && tagName != this.tagName) return ;
  if( tagName === this.tagName) this.startProcess = true;
  this.rules.forEach(function(element){
    element.process(tagName,attribs);
  });
};

HierarchyRule.prototype.end = function(tagName){
  if(tagName === this.tagName){
    this.rules.forEach(function(element){
      element.end();
    });
    this.startProcess=false;
  }
};

HierarchyRule.prototype.result = function(){
  var result = "";
  this.rules.forEach(function(element){
    result += element.result();
  });
  return result;
};

module.exports = HierarchyRule;
