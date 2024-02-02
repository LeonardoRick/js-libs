/**
 * run a function when ctrl + z is pressed
 * @param {Function} callback
 */
export function keyboardUndoListener(callback) {
  const isMac = navigator?.userAgentData?.platform?.toLocaleLowerCase().indexOf('mac') >= 0;
  const helperKey = isMac ? 'metaKey' : 'ctrlKey';
  document.addEventListener('keydown', function (event) {
    if (event[helperKey] && event.key === 'z') {
      callback();
    }
  });
}
