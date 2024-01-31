import { isDefined } from './general.js';

/**
 * find if any value is defined in a list
 * @param {any[]} list
 * @returns {boolean}
 */
export function any(list) {
  return list.findIndex((value) => isDefined(value)) !== -1;
}
