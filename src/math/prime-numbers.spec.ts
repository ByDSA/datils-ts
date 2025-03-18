import { getNthPrime } from "./prime-numbers";

describe.each([
  [1, 2],
  [2, 3],
  [100, 541],
  [3, 5],
])("getNthPrime", (n, expected) => {
  it(`n=${n} prime should be ${expected}`, () => {
    const actual = getNthPrime(n);

    expect(actual).toBe(expected);
  } );
} );
