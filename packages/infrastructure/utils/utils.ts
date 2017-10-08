import { Subscription } from 'rxjs/Subscription';

export function unsubscribe (...subscriptions: Array<Subscription>): void {
  if (!subscriptions) { return; }

  subscriptions.forEach(item => {
    if (item){ item.unsubscribe(); }
  });
}

export function isString (target: any): boolean {
  return target && typeof (target) === 'string';
}
export function isNumber (target: any): boolean {
  return isNotEmpty(target, true) && !isNaN(target);
}
export function isObject (target: any): boolean {
  return target && typeof (target) === 'object' && target.length === undefined;
}
export function isDate (target: any): boolean {
  return target && Object.prototype.toString.call(target) === '[object Date]';
}
export function isArray (target: any): boolean {
  return target && Object.prototype.toString.call(target) === '[object Array]';
}
export function isFunction (target: any): boolean {
  return target && typeof (target) === 'function';
}
export function isNull (target: any): boolean {
  return target === undefined || target === null;
}
export function isNotNull (target: any): boolean {
  return !isNull(target);
}
export function isEmpty (
  target: any,
  noWhiteSpace: boolean = false,
  noZero: boolean = false
): boolean {
  return isNull(target) || target === ''
  || (noWhiteSpace ? (isString(target) && target.trim().length === 0) : false)
  || (noZero ? target === 0 : false);
}
export function isNotEmpty (
  target: any,
  noWhiteSpace: boolean = false,
  noZero: boolean = false,
): boolean {
  return !isEmpty(target, noWhiteSpace, noZero);
}


export function parseString (target: any): string {
  return isNotNull(target) ? target : '';
}
export function parseNumber (target: any): number {
  return isNumber(target) ? Number(target) : 0;
}
export function parseBoolean (target: any): boolean {
  if (isNotNull(target)) {
    switch (target.toString().trim()) {
      case '1':
      case 'true':
        return true;
      case '0':
      case 'false':
        return false;
    }
  }

  return false;
}
export function parseDate (target: any): Date {
  return target ? new Date(isNaN(target) ? target : target * 1000) : new Date(-8640000000000000);
}
export function padNumber (value: number): string {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  }
  else {
    return '';
  }
}
export function camelToSnakeCase (target: string, dilimeter: string): string {
  const _upperChars = target.match(/([A-Z])/g);
  if (!_upperChars || !dilimeter) { return target; }

  let result = target;
  for (let i = 0; i < _upperChars.length; i++) {
    result = result.replace(new RegExp(_upperChars[i]), `${dilimeter}${_upperChars[i].toLowerCase()}`);
  }

  if (result.slice(0, 1) === dilimeter) {
    result = result.slice(1);
  }

  return result;
}

export function newGUID (): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const _random = Math.random() * 16 | 0;
    return (char === 'x' ? _random : (_random & 0x3 | 0x8)).toString(16);
  });
}

export function getPropertyValue (target: Object, props: Array<string>): any {
  let result = null;
  let _prop;

  for (let i = 0; i < props.length; i++) {
    _prop = i === 0 ? target[props[i]] : _prop[props[i]];

    if (isNull(_prop)) {
      break;
    }
  }

  result = _prop;

  return result;
}

export function sortArray (target: Array<any>, sortBy: string, sortType: 'asc' | 'desc') {
  return target.sort((item1, item2) => {
    const _order = sortType === 'desc' ? -1 : 1;
    const _item1Value = getPropertyValue(item1, sortBy.split('.'));
    const _item2Value = getPropertyValue(item2, sortBy.split('.'));

    if (isNull(_item1Value) && isNull(_item2Value)) {
      return 0;
    }
    if (isNull(_item1Value)) {
      return 1 * _order;
    }
    if (isNull(_item2Value)) {
      return -1 * _order;
    }
    if (isString(_item1Value)) {
      return _item1Value.localeCompare(_item2Value) * _order;
    }
    if (isDate(_item1Value)) {
      return (_item1Value.getTime() - _item2Value.getTime()) * _order;
    }

    return (_item1Value - _item2Value) * _order;
  });
}
