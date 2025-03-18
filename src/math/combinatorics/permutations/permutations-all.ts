import { getCombinations } from "../combinations/combinations";
import { countPermutations, getPermutations } from "./permutations";

/**
 * Calculates the total number of permutations of `n` elements,
 * considering all possible values of `k` from 0 to `n`.
 * Formula: ∑ P(n, k) from k=0 to n
 *
 * @param n - The total number of elements.
 * @returns The total number of permutations for all k values.
 */
export function countAllPermutations(n: number): bigint {
  let total = 0n; // Start from 0 and sum all permutations

  for (let k = 0; k <= n; k++)
    total += countPermutations(n, k);

  return total;
}

/**
 * Generates all possible permutations of all possible sizes from an array.
 * This includes permutations from size 0 (empty array) up to the full array length.
 * For example, given [1,2], it returns: [], [1], [2], [1,2], [2,1]
 *
 * @template T - The type of elements in the input array
 * @param {T[]} array - The input array from which to generate permutations
 * @returns {T[][]} An array containing all possible permutations of all possible sizes
 *
 * @example
 * getAllPermutations([1, 2])
 * // Returns: [[], [1], [2], [1,2], [2,1]]
 *
 * @example
 * getAllPermutations(['a', 'b', 'c'])
 * // Returns: [[], ['a'], ['b'], ['c'], ['a','b'], ['b','a'], ['b','c'], ['c','b'],
 * //          ['a','c'], ['c','a'], ['a','b','c'], ['a','c','b'], ['b','a','c'],
 * //          ['b','c','a'], ['c','a','b'], ['c','b','a']]
 */
export function getAllPermutations<T>(array: T[]): T[][] {
  const result: T[][] = [[]]; // Include empty array as a permutation

  for (let k = 1; k <= array.length; k++) {
    const combinations = getCombinations(array, k);

    for (const combo of combinations)
      result.push(...getPermutations(combo));
  }

  return result;
}
