/**
 * Generates all possible combinations (no matters order) from an array of elements.
 * The combinations are returned in ascending order of length, from 1 to array.length.
 *
 * @typeParam T - The type of elements in the array
 * @param array - The input array to generate combinations from
 * @returns Array containing all possible combinations of the input elements
 *
 * @example
 * ```typescript
 * getCombinations([1, 2, 3])
 * // Returns: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
 * ```
 */
export function getAllCombinations<T>(array: T[]): T[][] {
  const result: T[][] = [[]];
  const generate = (current: T[], index: number) => {
    if (current.length > 0)
      result.push([...current]);

    for (let i = index; i < array.length; i++) {
      current.push(array[i]);
      generate(current, i + 1);
      current.pop();
    }
  };

  generate([], 0);

  return result;
}

/**
 * Calculates the total number of possible combinations (no matters order) for all subset sizes
 * from an n-element set. Uses the formula 2^n which represents the size of the power set.
 *
 * @param n - Number of elements in the set
 * @returns Total number of possible combinations as a BigInt
 *
 * @example
 * ```typescript
 * countTotalCombinations(3) // Returns: 8n
 * ```
 */
export function countAllCombinations(n: number): bigint {
  return BigInt(2 ** n);
}
