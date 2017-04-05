function isString(target) {
  return target && typeof (target) === 'string';
}

function isObject(target) {
  return target && typeof (target) === 'object';
}

function isArray(target) {
  return target && Object.prototype.toString.call(target) === '[object Array]';
}

function isFunction(target) {
  return target && typeof (target) === 'function';
}

function isNull(target) {
  return target === undefined || target === null;
}

function isNotNull(target) {
  return !isNull(target);
}

function isEmpty(target) {
  return isNull(target) || target === '';
}

function isNotEmpty(target) {
  return !isEmpty(target);
}


export {
  isString,
  isObject,
  isArray,
  isFunction,
  isNull,
  isNotNull,
  isEmpty,
  isNotEmpty,
};
