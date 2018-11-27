# shopback-seo [![NPM version](https://badge.fury.io/js/shopback-seo.svg)](https://npmjs.org/package/shopback-seo) [![Build Status](https://travis-ci.org/walleat/shopback-seo.svg?branch=master)](https://travis-ci.org/walleat/shopback-seo)

> used to valid html content

## Installation

```sh
$ npm install --save shopback-seo
```

## Usage sample

### Input is file path
```js

const SeoValidator = require('shopback-seo');
var output =  process.stdout;
var input = __dirname+'/test.html';
var seoValidator = new SeoValidator(input,output);
var rule = [
  {
      "rule":"attrib",
      "tag":"a",
      "attribute":"rel"
  }
];
seoValidator.addRules(rule).valid();

```

### Input is writable stream
```js

const SeoValidator = require('shopback-seo');
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

```

### Rules setting
``` js
/*
  rule property can be attrib, tagMax, hierarchy,tagMin,
  each rule has its relative property, please refer to the
  following sample.

  // attrib rule need to have tag, attribute property. It can be
   use for valid the attribute and value of attribute on the
   specified tag.

  // tagMax rule need to have tag, max property. It can be use
   for valid the tag occurrance.

  // hierarchy rule need to have tag, rules property. It can be
   use for valid complex rule inside the specified html tag.

   //tagMin rule need to have mandatory tag, attribute, min property
*/
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

```

## License

ISC © [thomas.chuang]()
