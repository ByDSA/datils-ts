import { factorial } from "./factorial";

describe.each([
  [1, 1],
  [0, 1],
  [-1, 1],
  [2, 2],
  [3, 6],
  [4, 24],
  [5, 120],
  [6, 720],
  [7, 5040],
  [8, 40320],
  [9, 362880],
  // Uncached:
  [20, 2432902008176640000],
  [10, 3628800],
  [13, 6227020800],
  [15, 1307674368000],
  [25, 15511210043330985984000000n],
])("factorial", (n, expected) => {
  it(`${n}! should be ${expected}`, () => {
    const actual = factorial(n);

    expect(actual).toBe(BigInt(expected));
  } );
} );
