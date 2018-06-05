/**
 * Created by Cooper on 2018/6/5.
 */
const cjv = require('./');
const expect = require('chai').expect;

describe('json validate', function() {
  it('basic', function() {
    const data = {
      firstName: 'John',
      lastName: 'Smith',
      age: 27
    };
    const schema = {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      age: { type: 'number' }
    };
    const result = cjv(schema, data);
    expect(result).to.equal(true);
  });

  it('custom', function() {
    const data = {
      firstName: 'John',
      lastName: 'Smith',
      age: 27
    };
    const schema = {
      firstName: { type: 'string' },
      lastName: { type: 'string', validate: v => /^s\w+/i.test(v) },
      age: { type: 'number', validate: v => 0 < v && v < 120 }
    };
    const result = cjv(schema, data);
    expect(result).to.equal(true);
  });

  it('nested', function() {
    const data = {
      firstName: 'John',
      lastName: 'Smith',
      age: 27,
      address: {
        streetAddress: '21 2nd Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10021-3100'
      }
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
      }
    };
    const result = cjv(schema, data);
    expect(result).to.equal(true);
  });

  it('array', function() {
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
    const result = cjv(schema, data);
    expect(result).to.equal(true);
  });
});
