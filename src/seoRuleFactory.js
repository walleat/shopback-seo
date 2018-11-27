/**
This is base rule class.
**/

const TagAttribRule = require('./tagAttribRule');
const TagMaxRule = require('./tagMaxRule');
const TagMinRule = require('./tagMinRule');
const HierarchyRule = require('./hierarchyRule');

function createSeoRule(setting){
  switch (setting.rule) {
    case 'attrib':
      return new TagAttribRule(setting.tag,setting.attribute);
    case 'tagMax':
      return new TagMaxRule(setting.tag,setting.max);
    case 'tagMin':
      return new TagMaxRule(setting.tag,setting.min,setting.attribute,setting.attributeValue);

    case 'hierarchy':
      var rules = new Array(setting.rules.length);
      setting.rules.forEach(function(element){
        
        var rule = createSeoRule(element);
        rules.push(rule);
      })
      return new HierarchyRule(setting.tag,rules);

    default:
      throw { name :"IllegalStateException", message: "wront rule type" + element.rule};

  }
};

module.exports.createSeoRule = createSeoRule;
