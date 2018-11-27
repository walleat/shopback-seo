/**
This is base rule class.
**/
const required = function(){ throw new Error("Implement!"); };
const notRequired = function(){};
var RuleInterface = {
    valid: required,
    end: notRequired,
    result: required

};
function SeoRule(){
}
SeoRule.prototype = Object.create(RuleInterface);
module.exports = SeoRule;
