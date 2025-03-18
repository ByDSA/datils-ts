import { countAllCombinations, getAllCombinations } from "./combinations-all";
import { countCombinations, getCombinations } from "./combinations";

describe.each([
  [10, 3, 120n],
  [100, 5, 75287520n],
])("countCombinations", (n, k, expected) => {
  it(`n=${n}, k=${k} should be ${expected}`, () => {
    const actual = countCombinations(n, k);

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  [[1, 2], [[], [1], [2], [1, 2]]],
])("getAllCombinations", (array, expected) => {
  it(`${JSON.stringify(array)} should be ${JSON.stringify(expected)}`, () => {
    const actual = getAllCombinations(array);

    expect(new Set(actual)).toEqual(new Set(expected));
  } );
} );

describe.each([
  [[1, 2], 2, [[1, 2]]],
  [[1, 2], 1, [[1], [2]]],
  [[1], 2, []],
  [[1, 2, 3], 1, [[1], [2], [3]]],
  [[1, 2, 3], 2, [[1, 2], [1, 3], [2, 3]]],
])("getCombinations", (array, k, expected) => {
  it(`array=${JSON.stringify(array)}, k=${k} should be ${JSON.stringify(expected)}`, () => {
    const actual = getCombinations(array, k);

    expect(new Set(actual)).toEqual(new Set(expected));
  } );
} );

describe.each([
  [1],
  [2],
  [1, 2, 3],
] as number[][])("getCombinations.length vs countCombinations", (...array: number[]) => {
  it(`getCombinations(${JSON.stringify(array)}).length should be countCombinations(${array.length})`, () => {
    for (let i = 0; i < array.length; i++) {
      const count = countCombinations(array.length, i);
      const combinations = getCombinations(array, i);

      expect(BigInt(combinations.length).toString()).toBe(count.toString());
    }
  } );
} );

describe.each([
  [1],
  [2],
  [1, 2, 3],
] as number[][])("getAllCombinations.length vs countAllCombinations", (...array: number[]) => {
  it(`getAllCombinations(${JSON.stringify(array)}).length should be countAllCombinations(${array.length})`, () => {
    const count = countAllCombinations(array.length);
    const combinations = getAllCombinations(array);

    expect(BigInt(combinations.length).toString()).toBe(count.toString());
  } );
} );
