import { moveTagToCursorPosition, getCursorCenterDistance, normalize } from '../../index.js';

/**
 * this example creates a light that follows the mouse
 */
const mouselight = document.querySelector('#mouseLight');

if (mouselight) {
  const { handler } = moveTagToCursorPosition(mouselight, {
    addListener: false,
  });

  const { handler: centerHandler } = getCursorCenterDistance({ addListener: false });

  function masterHandler(e) {
    handler(e);
    const { distance, maxDistance } = centerHandler(e);

    const newOpacity = normalize(distance, maxDistance, {
      min: 0.5,
      max: 1,
      inverted: true,
    });

    const newBlur = normalize(distance, maxDistance, { min: 90, max: 160, inverted: true }) + 'px';

    const newSize = normalize(distance, maxDistance, {
      min: 300,
      max: 500,
      inverted: true,
    });

    if (mouselight) {
      mouselight.style.filter = `blur(${newBlur})`;
      mouselight.style.opacity = newOpacity.toString();
      mouselight.style.height = `${newSize}px`;
      mouselight.style.width = `${newSize}px`;
    }
  }

  const html = document.querySelector('html');
  if (html) {
    html.addEventListener('mousemove', (e) => {
      masterHandler(e);
    });
  }
}
