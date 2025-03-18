import { factorial } from "../factorial";
import { countPermutations } from "../permutations/permutations";

export function getCombinations<T>(arr: T[], k: number): T[][] {
  if (k === 0)
    return [[]];

  if (k > arr.length)
    return [];

  const combinations: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(i + 1);
    const subCombinations = getCombinations(rest, k - 1);

    combinations.push(...subCombinations.map(combo => [arr[i], ...combo]));
  }

  return combinations;
}

/**
 * Calculates the number of possible combinations (no matters order) of k elements
 * that can be selected from n elements. Uses the formula C(n,k) = P(n,k)/k!
 * where P(n,k) is the number of permutations.
 *
 * @param n - Total number of elements to choose from
 * @param k - Number of elements to select
 * @returns The number of possible combinations as a BigInt
 *
 * @example
 * ```typescript
 * countCombinations(5, 3) // Returns: 10n
 * ```
 */
export function countCombinations(n: number, k: number): bigint {
  if (k > n)
    return 0n;

  return countPermutations(n, k) / factorial(k);
}
