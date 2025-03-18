import { frac } from "../frac";
import { pow2 } from "./Pow2";

describe.each([
  [1, 12, 2 ** (1 / 12)],
])("frac", (num: number, den: number, expected: number) => {
  it(`${num} / ${den}`, () => {
    const actual = pow2(frac(num, den));

    expect(+actual).toBe(expected);
  } );
} );
