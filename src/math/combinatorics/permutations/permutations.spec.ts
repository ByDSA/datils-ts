import { countPermutations, getPermutations } from "./permutations";
import { getAllPermutations, countAllPermutations } from "./permutations-all";

describe.each([
  [5, 3, 60n],
  [3, 0, 1n],
  [3, 1, 3n],
  [3, 2, 6n],
  [3, 3, 6n],
])("countPermutations", (n, k, expected) => {
  it(`n=${n}, k=${k} should be ${expected}`, () => {
    const actual = countPermutations(n, k);

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  [1, 2n],
  [2, 5n],
  [3, 16n],
])("countAllPermutations", (n, expected) => {
  it(`n=${n} should be ${expected}`, () => {
    const actual = countAllPermutations(n);

    expect(actual).toBe(expected);
  } );
} );

function limitStr(str: string, n: number): string {
  if (str.length < n)
    return str;

  return str.substring(n - 3) + "...";
}

function stringifyArray<T>(array: T[]): string {
  return limitStr(JSON.stringify(array), 40);
}

describe.each([
  [[], []],
  [[1], [[1]]],
  [[1, 2], [[1, 2], [2, 1]]],
])("getPermutations", (array, expected) => {
  it(`array=${stringifyArray(array)} should be ${stringifyArray(expected)}`, () => {
    const actual = getPermutations(array);
    const actualSet = new Set(actual);
    const expectedSet = new Set(expected);

    expect(actualSet).toEqual(expectedSet);
  } );
} );

describe.each([
  [[], [[]]],
  [[1], [[], [1]]],
  [[1, 2], [[], [1], [2], [1, 2], [2, 1]]],
  [[1, 2, 3], [[], [1], [2], [3], [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2],
    [1, 2, 3], [1, 3, 2], [2, 3, 1], [2, 1, 3], [3, 1, 2], [3, 2, 1]]],
])("getAllPermutations", (array, expected) => {
  it(`array=${stringifyArray(array)} should be ${stringifyArray(expected)}`, () => {
    const actual = getAllPermutations(array);
    const actualSet = new Set(actual);
    const expectedSet = new Set(expected);

    expect(actualSet).toEqual(expectedSet);
  } );
} );

describe.each([
  [[], []],
  [[1], [[1]]],
  [[1, 2], [[1, 2], [2, 1]]],
  [[1, 2, 3], [[1, 2, 3], [1, 3, 2], [2, 3, 1], [2, 1, 3], [3, 1, 2], [3, 2, 1]]],
])("getPermutations", (array, expected) => {
  it(`array=${stringifyArray(array)} should be ${stringifyArray(expected)}`, () => {
    const actual = getPermutations(array);
    const actualSet = new Set(actual);
    const expectedSet = new Set(expected);

    expect(actualSet).toEqual(expectedSet);
  } );
} );

describe.each([
  [1],
  [2],
  [1, 2, 3],
] as number[][])("getPermutations.length vs countPermutations", (...array: number[]) => {
  it(`getPermutations(${stringifyArray(array)}).length should be countPermutations(${array.length})`, () => {
    const count = countPermutations(array.length, array.length);
    const permutations = getPermutations(array);

    expect(BigInt(permutations.length).toString()).toBe(count.toString());
  } );
} );

describe.each([
  [],
  [1],
  [2],
  [1, 2, 3],
] as number[][])("getPermutations.length vs countPermutations", (...array: number[]) => {
  it(`getAllPermutations(${stringifyArray(array)}).length should be countAllPermutations(${array.length})`, () => {
    const count = countAllPermutations(array.length);
    const permutations = getAllPermutations(array);

    expect(BigInt(permutations.length).toString()).toBe(count.toString());
  } );
} );
