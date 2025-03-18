import { factorial } from "../factorial";

const permCache = new Map<string, bigint>();

/**
 * Calculates the number of permutations of `n` elements taken `k` at a time.
 * Formula: P(n, k) = n! / (n-k)!
 *
 * @param n - The total number of elements.
 * @param k - The number of elements in each permutation.
 * @returns The number of possible permutations.
 */
export function countPermutations(n: number, k: number): bigint {
  if (k > n)
    return 0n;

  const key = `${n},${k}`;

  if (permCache.has(key))
    return permCache.get(key)!;

  let result = factorial(n) / factorial(n - k);

  permCache.set(key, result);

  return result;
}

/**
 * Generates all possible permutations of an array of elements.
 *
 * This function uses a recursive algorithm to generate all possible orderings
 * of the input array elements. For an array of length n, it will generate n!
 * different permutations.
 *
 * @template T - The type of elements in the array
 * @param {T[]} array - The input array to generate permutations from
 * @returns {T[][]} An array containing all possible permutations of the input array
 *
 * @example
 * ```typescript
 * getAllPermutations([1, 2]); // returns [[1,2], [2,1]]
 * getAllPermutations(['a', 'b', 'c']);
 * // returns: [['a','b','c'], ['a','c','b'], ['b','a','c'],
 *             ['b','c','a'], ['c','a','b'], ['c','b','a']]
 * ```
 *
 * @remarks
 * - Time complexity: O(n!)
 * - Space complexity: O(n!)
 * - The function preserves the original array and returns a new array with all permutations
 */
export function getPermutations<T>(array: T[]): T[][] {
  const result: T[][] = [];

  // Caso base: si el array tiene solo un elemento, la única permutación es el array mismo
  if (array.length === 1)
    return [array];

  // Recursión
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const remaining = array.slice(0, i).concat(array.slice(i + 1));
    const remainingPerms = getPermutations(remaining);

    for (const perm of remainingPerms)
      result.push([current, ...perm]);
  }

  return result;
}

/*
TODO: se podría hacer una versión de getPermutations con un segundo parámetro
de entrada con opciones
El objetivo sería no calcular todas las permutaciones si sólo hacen falta unas pocas
o menos que el total.

type StopBranchFn<T> = (next: T[], newItem: T, current: T[])=> boolean;
type ValidFn<T> = (current: T[], result: readonly T[][])=> boolean;
type Options<T> = {
  stopBranchFn?: StopBranchFn<T>;
  validFn?: ValidFn<T>;
};

validFn: si la permutación (ya la versión construida final) es válida según los criterios
de búsqueda.en verdad se puede no pasar la función y filtar el retorno, creo que
sería igual de eficiente y no ahorra nada calcularlo dentro de la función que fuera.

StopBranchFn: se comprueba si lo que se lleva construido de permutación tiene alguna
inconsistencia según lo que se busca. así se evita que se generen el resto de
permutaciones basadas en la permutación que se debería descartar

*/
