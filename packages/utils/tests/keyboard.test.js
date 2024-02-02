import { keyboardUndoListener } from '../src/keyboard';

describe('keyboardUndoListener ::', () => {
  it('should call the callback function when a ctrl + z event is triggered', () => {
    const f = () => 1 + 1;
    const callback = jest.fn(f);

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });

    keyboardUndoListener(callback);
    document.dispatchEvent(event);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should trigger only on metaKey if on MacOS', () => {
    if (!navigator.userAgentData) {
      Object.defineProperty(navigator, 'userAgentData', { get: () => {}, configurable: true });
    }
    jest.spyOn(navigator, 'userAgentData', 'get').mockImplementation(() => ({
      platform: 'macOS',
    }));

    const f = () => 1 + 1;
    const callback = jest.fn(f);
    const ctrlEvent = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    });
    const metaEvent = new KeyboardEvent('keydown', {
      key: 'z',
      metaKey: true,
    });
    keyboardUndoListener(callback);
    document.dispatchEvent(ctrlEvent);
    expect(callback).not.toHaveBeenCalled();
    document.dispatchEvent(metaEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
