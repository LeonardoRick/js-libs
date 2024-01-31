import { any } from '../src/lists';

describe('any::', () => {
  it('should return true if any value in a list is defined', () => {
    expect(any([1, 2, 3])).toEqual(true);
  });

  it('should return true even if any value is falsy but defined', () => {
    expect(any([undefined, null, false])).toEqual(true);
    expect(any([undefined, null, 0])).toEqual(true);
  });

  it('should return false if no value is defined', () => {
    expect(any([undefined, undefined, null])).toEqual(false);
    expect(any([])).toEqual(false);
  });
});
