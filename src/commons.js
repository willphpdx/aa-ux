const getQueryString = function( params ) {
  return Object
    .keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
            .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
            .join('&')
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    })
    .join('&')
}


const replacer = function( depth = Number.MAX_SAFE_INTEGER ) {
  let objects, stack, keys;
  return function(key, value) {
    //  very first iteration
    if (key === '') {
      keys = ['root'];
      objects = [{keys: 'root', value: value}];
      stack = [];
      return value;
    }

    //  From the JSON.stringify's doc: "The object in which the key was found is
    //  provided as the replacer's this parameter."
    //  Thus one can control the depth
    while ( stack.length && this !== stack[0] ) {
      stack.shift();
      keys.pop();
    }
    // console.log( keys.join('.') );

    let type = typeof value;
    if ( type === 'boolean' || type === 'number' || type === 'string' ) {
      return value;
    }
    if ( type === 'function' ) {
      return `[Function, ${value.length + 1} args]`;
    }
    if (value === null) {
      return 'null';
    }
    if (!value) {
      return undefined;
    }
    if (stack.length >= depth ) {
      if ( Array.isArray(value) ) {
        return `[Array(${value.length})]`;
      }
      return '[Object]';
    }
    let found = objects.find( o => o.value === value );
    if ( !found ) {
      keys.push( key );
      stack.unshift( value );
      objects.push({keys: keys.join('.'), value: value});
      return value;
    }
    //  actually, here's the only place where the keys keeping is useful
    return `[Duplicate: ${found.keys}]`;
  };
};

module.exports.getQueryString = getQueryString;
module.exports.replacer = replacer;
