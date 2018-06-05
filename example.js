/**
 * Created by Cooper on 2018/6/4.
 */

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
  age: { type: 'number' },
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
