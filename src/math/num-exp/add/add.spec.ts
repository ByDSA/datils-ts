import { frac } from "../frac";
import { NumExp } from "../NumExp";
import { add } from "./add";

describe.each([
  [1, 2, 3],
  [0, 2, 2],
  [0, -2, -2],
  [-3, -2, -5],
  [frac(3, 2), frac(3, 2), frac(6, 2)],
  [frac(3, 2), frac(-3, 2), frac(0, 2)],
  [frac(3, 2), frac(3, -2), frac(0, 2)],
  [frac(3, 2), 2, frac(7, 2)],
  [frac(1300, 1200), -1, frac(100, 1200)],
])("tests", (a: NumExp, b: NumExp, expected: NumExp) => {
  describe(`(${a}) + (${b}) => ${expected}`, () => {
    it(`${+a} + ${+b} => ${+expected}`, () => {
      const actual = add(a, b);

      expect(+actual).toBeCloseTo(+expected);
    } );
  } );
} );
