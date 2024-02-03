import { createDefault, isPlainObject, isDefined, isDefinedAndNotEmpty } from './general.js';
import { keyboardUndoListener } from './keyboard.js';
import { any } from './lists.js';
import { hypotenuse, normalize } from './math.js';
import { runOnWorker, InlineWorker } from './run-on-worker.js';
import { moveTagToCursorPosition, getCursorCenterDistance } from './ui.js';

export default {
  // general
  createDefault,
  isPlainObject,
  isDefined,
  isDefinedAndNotEmpty,
  // keyboard
  keyboardUndoListener,
  // lists
  any,
  // math
  hypotenuse,
  normalize,
  // run on worker
  runOnWorker,
  InlineWorker,
  // ui
  moveTagToCursorPosition,
  getCursorCenterDistance,
};

// re-export named exports
export * from './general.js';
export * from './keyboard.js';
export * from './lists.js';
export * from './math.js';
export * from './run-on-worker.js';
export * from './ui.js';
