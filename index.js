function cjv(schema, data) {
  return jv(schema, data);
  function jv(schema, data, path = '') {
    let _path = path;
    Object.keys(schema).forEach(k => {
      path = path ? path + '.' + k : k;
      // console.log('========= path', path);
      if (Array.isArray(schema[k])) {
        if (schema[k].length !== 1) {
          throw new Error('scheme error of `' + path + '`');
        }
        if (!Array.isArray(data[k])) {
          throw new Error('type[array] error of `' + path + '`');
        }
        data[k].forEach(e => jv(schema[k][0], e, k));
      } else if (typeof schema[k].type === 'string') {
        if (schema[k].type !== typeof data[k]) {
          throw new Error('type error of `' + path + '`');
        }
      } else if (typeof schema[k].type === 'object') {
        return jv(schema[k].type, data[k], k);
      } else {
        throw new Error('type should be string or object');
      }
      if (schema[k].hasOwnProperty('validate')) {
        if (typeof schema[k]['validate'] !== 'function') {
          throw new Error('validate should be a function');
        }
        if (!schema[k]['validate'](data[k])) {
          throw new Error('type error of `' + path + '`');
        }
      }
      path = _path;
    });
    return true;
  }
}

module.exports = cjv;
