# cjv

a simpler json validator

compared with `ajv`,when I first to use `ajv`,I find it's complex,and little examples for a newcomer.

## install

```bash
npm i cjv -S
```

## example

```javascript
let data = {
  name: 'app',
  path: '/app',
  targets: [
    {
      url: 'https://localhost:3002',
      weight: 1,
      status: 1
    },
    {
      url: 'http://localhost:3002',
      weight: 1,
      status: 1
    }
  ],
  consumers: { apikey: '11111', status: 1 },
  order: 2
};

let schema = {
  name: { type: 'string', required: true, validate: v => v.length > 1 },
  path: { type: 'string', required: true, validate: v => true },
  consumers: { type: { apikey: { type: 'string' }, status: { type: 'number' } } },
  targets: [
    {
      url: { type: 'string' },
      weight: { type: 'number' },
      status: { type: 'number' }
    }
  ]
};

const cjv = require('cjv');

let r = cjv(schema, data);

console.time('cjv');
console.log(r);
console.timeEnd('cjv');
```
