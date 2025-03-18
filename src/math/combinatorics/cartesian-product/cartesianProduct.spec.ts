import { countCartesianProduct, getCartesianProduct } from "./cartesianProduct";

const ONE_GROUPS = [[1, 2, 3]];
const TWO_GROUPS = [[1, 2, 3], [4, 5, 6]];
const THREE_GROUPS = [[1, 2], [3, 4], [5, 6]];

describe.each([
  [ONE_GROUPS, 3],
  [TWO_GROUPS, 9],
  [THREE_GROUPS, 8],
])("countCartesianProduct", (groups, expected) => {
  it("number of elements after cartesian products of " + JSON.stringify(groups) + " should be " + expected, () => {
    const actual = countCartesianProduct(groups);

    expect(actual).toBe(expected);
  } );
} );

it("one group", () => {
  const groups = ONE_GROUPS;
  const actual = getCartesianProduct(groups);

  expect(actual).toHaveLength(3);
  expect(actual).toEqual([
    [1],
    [2],
    [3],
  ]);
} );

it("two groups", () => {
  const groups = TWO_GROUPS;
  const actual = getCartesianProduct(groups);

  expect(actual).toHaveLength(3 * 3);
  expect(actual).toEqual([
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 4],
    [2, 5],
    [2, 6],
    [3, 4],
    [3, 5],
    [3, 6],
  ]);
} );

it("three groups", () => {
  const groups = THREE_GROUPS;
  const actual = getCartesianProduct(groups);

  expect(actual).toHaveLength(2 * 2 * 2);
  expect(actual).toEqual([
    [1, 3, 5],
    [1, 3, 6],
    [1, 4, 5],
    [1, 4, 6],
    [2, 3, 5],
    [2, 3, 6],
    [2, 4, 5],
    [2, 4, 6],
  ]);
} );

it("with nulls", () => {
  const groups = [[null, 2], [3, null]];
  const actual = getCartesianProduct(groups);
  const expected = [
    [null, 3],
    [null, null],
    [2, 3],
    [2, null],
  ];

  expect(actual).toEqual(expected);
} );

it("with undefined", () => {
  const groups = [[undefined, 2], [3, undefined]];
  const actual = getCartesianProduct(groups);
  const expected = [
    [undefined, 3],
    [undefined, undefined],
    [2, 3],
    [2, undefined],
  ];

  expect(actual).toEqual(expected);
} );

it("with all empty groups", () => {
  const groups = [[], []];
  const actual = getCartesianProduct(groups);
  const expected = [] as any;

  expect(actual).toEqual(expected);
} );

it("with one empty groups", () => {
  const groups = [[], [1, 2, 3]];
  const actual = getCartesianProduct(groups);
  const expected = [] as any;

  expect(actual).toEqual(expected);
} );
