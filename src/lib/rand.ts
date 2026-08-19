/**
 * Deterministic pseudo-random numbers.
 *
 * Used for decorative scatter (the heart burst, the confetti positions) so
 * the server and the browser render exactly the same markup — no hydration
 * mismatch, and no impure calls during render.
 */
export function makeRandom(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 0xffffffff;
  };
}
