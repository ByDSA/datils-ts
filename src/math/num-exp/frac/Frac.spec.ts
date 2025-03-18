import { frac } from "./Frac";
import { FracExp } from "./FracExp";

describe.each([
  [4, 2, 2],
  [2, 4, 0.5],
])("tests", (num: number, den: number, expected: number) => {
  it(`${num} / ${den}`, () => {
    const actual: FracExp = frac(num, den);

    expect(+actual).toBe(expected);
  } );
} );
