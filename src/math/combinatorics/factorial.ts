const factorialCache: Record<number, bigint> = {
  0: 1n,
  1: 1n,
  2: 2n,
  3: 6n,
  4: 24n,
  5: 120n,
  6: 720n,
  7: 5040n,
  8: 40320n,
  9: 362880n,
};
let highestKey = 9;

export function factorial(n: number): bigint {
  if (factorialCache[n] !== undefined)
    return factorialCache[n];

  if (n <= 0)
    return 1n;

  let result = factorialCache[highestKey];

  while (highestKey < n) {
    highestKey++;
    result *= BigInt(highestKey);
    factorialCache[highestKey] = result;
  }

  return result;
}
