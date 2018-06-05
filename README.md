# cjv

[![NPM Version][npm-image]][npm-url]

a simpler json validator

compared with `ajv`, when I first to use `ajv`, I find that it's complex, and few examples for a newcomer.

## Install

```bash
npm i cjv -S
```

## Usage

```javascript
const data = {
  firstName: 'John',
  lastName: 'Smith',
  age: 27,
  address: {
    streetAddress: '21 2nd Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10021-3100'
  },
  phoneNumbers: [
    {
      type: 'home',
      number: '212 555-1234'
    },
    {
      type: 'office',
      number: '646 555-4567'
    },
    {
      type: 'mobile',
      number: '123 456-7890'
    }
  ]
};

const schema = {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number', validate: v => 0 < v && v < 120 },
  address: {
    type: {
      streetAddress: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      postalCode: { type: 'string', validate: v => /\d{5}-\d{4}/.test(v) }
    }
  },
  phoneNumbers: [
    {
      type: { type: 'string' },
      number: { type: 'string' }
    }
  ]
};

const cjv = require('./');

try {
  let result = cjv(schema, data);
  console.time('cjv');
  console.log(result);
  console.timeEnd('cjv');
} catch (e) {
  console.error(e);
}

```


## Test

```bash
npm test
```

[npm-image]: https://img.shields.io/npm/v/cjv.svg
[npm-url]: https://www.npmjs.com/package/cjv