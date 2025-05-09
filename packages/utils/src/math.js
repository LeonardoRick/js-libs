/**
 * calculate hypotenuse based on two cathetus
 * @param {number} cat1
 * @param {number} cat2
 * @returns {number} hypotenuse value
 */
export function hypotenuse(cat1, cat2, { decimals = 2 } = {}) {
  return round(Math.sqrt(Math.pow(cat1, 2) + Math.pow(cat2, 2)), decimals);
}

/**
 * normalize a value based on another.
 * @param {number} value that we want to normalized based on another
 * @param {number} normalizer that our current value can reach. This is important so we can
 * first normalize it between 0 and 1 (const normalized)
 * @param {{min: number, max: number, inverted: boolean }} options
 *
 *
 * min: The **lowest possible output value** after normalization. It represents the start of the desired output range.
 * For example, if you want the result to be scaled between 50 and 100, set `min = 50`.
 *
 * max: The **highest possible output value** after normalization. It represents the end of the desired output range.
 * Continuing the example above, set `max = 100` to cap the output range.
 *
 * Note: These values do not restrict the input range (which is controlled by `value` and `normalizer`), but define
 * how the output is mapped and scaled. The normalized output will always fall between `min` and `max`.
 *
 * inverted: is true we invert the logic. Usually our value and normalizer are distances. And in
 * case of distances, as variable value is smaller (which means our distance is lower to our
 * point of reference) we want to emphasize somehting, so when inverted is true, as 'value'
 * tends to 0,the returned value is closer to `max`
 * @returns {number} normalized value
 *
 *  Example:
 * normalize(30, 100, { min: 0, max: 1 }) => 0.3
 * normalize(30, 100, { min: 0, max: 1, inverted: true }) => 0.7
 */
export function normalize(value, normalizer, { min = 0, max = 1, inverted = false } = {}) {
  // Calculate the normalized value as a proportion of max
  const normalized = value / normalizer;
  // Interpolate between min and max to handle
  // different values besides 0 and 1
  const offset = 1 - normalized;
  const _min = inverted ? max : min;
  const _max = inverted ? min : max;
  const interpolated = offset * _min + normalized * _max;
  // Clamp to ensure the result is within the desired range
  return Math.min(Math.max(interpolated, min), max);
}

/**
 * Convert a “normalized” value back to its real distance.
 * Created with chatGPT based on the normalize function.
 *
 * @param {number} normVal   The value returned by `normalize`
 * @param {number} normalizer  The same normalizer you passed to `normalize`
 * @param {{ min?: number; max?: number; inverted?: boolean }} options
 *        Must be identical to the options used when normalising.
 * @returns {number} the original (or equivalent) raw value
 */
export function denormalize(normVal, normalizer, { min = 0, max = 1, inverted = false } = {}) {
  // replicate helper variables exactly as in `normalize`
  const _min = inverted ? max : min;
  const _max = inverted ? min : max;

  // Undo interpolation:  normVal = _min + n * (_max - _min)
  // => n = (normVal - _min) / (_max - _min)
  const n = (normVal - _min) / (_max - _min);

  // Clamp n back into [0,1] just in case
  const clampedN = Math.min(Math.max(n, 0), 1);

  // Recover the original value (distance)
  return clampedN * normalizer;
}

/**
 * Round a number
 * @param {number} n
 * @param {number} decimals
 * @returns number rounded with 'decimals' being the number of decimals
 */
export function round(n, decimals) {
  const h = +'1'.padEnd(decimals + 1, '0'); // 10 or 100 or 1000 or etc
  return Math.round(n * h) / h;
}
