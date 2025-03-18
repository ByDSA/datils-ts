/**
 * Cache to store already calculated prime numbers
 */
const primeCache: number[] = [2, 3, 5, 7, 11, 13];
const primeSet = new Set<number>(primeCache);
let calculatedPrimesUntil = primeCache.at(-1) ?? 0;

/**
 * Checks if a number is prime
 */
export function isPrime(num: number): boolean {
  // If number is already in cache, use the cache
  if (num <= calculatedPrimesUntil)
    return primeSet.has(num);

  // Calculate new primes if needed
  getNthPrime(Math.ceil((num + 1) / 2));

  // Now the number should be in cache if it's prime
  return primeSet.has(num);
}

// eslint-disable-next-line no-underscore-dangle
function _isPrimeUntilCache(num: number): boolean {
  if (num < 2)
    return false;

  const sqrt = Math.sqrt(num);

  for (const prime of primeCache) {
    if (prime > sqrt)
      break;

    if (num % prime === 0)
      return false;
  }

  return true;
}

/**
 * Returns the nth prime number (1-based index)
 * @param n - The position of the prime number to find
 * @returns The nth prime number
 * @throws Error if n is less than 1
 */
export function getNthPrime(n: number): number {
  if (n < 1)
    throw new Error("Index must be greater than 0");

  // If the prime number is already in cache, return it
  if (n <= primeCache.length)
    return primeCache[n - 1];

  // Find next prime numbers until we reach the desired position
  let currentNum = Math.max(primeCache[primeCache.length - 1] + 2, calculatedPrimesUntil);

  while (primeCache.length < n) {
    if (_isPrimeUntilCache(currentNum)) {
      primeCache.push(currentNum);
      primeSet.add(currentNum);
      calculatedPrimesUntil = currentNum;
    }

    currentNum += 2; // Check only odd numbers
  }

  return primeCache[n - 1];
}
