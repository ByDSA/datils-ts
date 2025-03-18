import { frac } from "../frac";
import { NumExp } from "../NumExp";
import { pow2 } from "../pow2/Pow2";
import { mult } from "./mult";

describe.each([
  [frac(3, 2), frac(3, 2), frac(9, 4)],
  [frac(3, -2), frac(-3, 2), frac(9, 4)],
  [frac(3, 2), frac(-3, 2), frac(-9, 4)],
  [frac(3, 2), frac(3, -2), frac(9, -4)],
  [frac(3, 2), 2, frac(6, 2)],
  [frac(3, 2), 3, frac(9, 2)],
  [frac(3, 2), -5, frac(-15, 2)],
  [pow2(frac(1, 12)), 2, pow2(frac(13, 12))],
  [pow2(frac(1, 12)), pow2(frac(1, 12)), pow2(frac(1, 6))],
  [pow2(frac(1, 12)), 3, mult(3, pow2(frac(1, 12)))],
])("tests", (a: NumExp, b: NumExp, expected: NumExp) => {
  describe(`(${a}) * (${b}) => ${expected}`, () => {
    it(`${+a} * ${+b} => ${+expected}`, () => {
      const actual = +a * +b;

      expect(actual).toBe(+expected);
    } );
  } );
} );
