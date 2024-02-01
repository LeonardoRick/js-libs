import { createDefault, isPlainObject, isDefined, isDefinedAndNotEmpty } from './general.js';
import { any } from './lists.js';
import { hypotenuse, normalizeOnRange } from './math.js';
import { runOnWorker, InlineWorker } from './run-on-worker.js';
import { moveTagToCursorPosition, getCursorCenterDistance } from './ui.js';

export default {
  // general
  createDefault,
  isPlainObject,
  isDefined,
  isDefinedAndNotEmpty,
  // lists
  any,
  // math
  hypotenuse,
  normalizeOnRange,
  // run on worker
  runOnWorker,
  InlineWorker,
  // ui
  moveTagToCursorPosition,
  getCursorCenterDistance,
};

// re-export named exports
export * from './general.js';
export * from './lists.js';
export * from './math.js';
export * from './run-on-worker.js';
export * from './ui.js';
