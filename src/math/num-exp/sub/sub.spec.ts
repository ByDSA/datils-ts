import { frac } from "../frac";
import { NumExp } from "../NumExp";

describe.each([
  [1, 2, -1],
  [0, 2, -2],
  [0, -2, 2],
  [-3, -2, -1],
  [frac(3, 2), frac(3, 2), 0],
  [frac(3, 2), frac(-3, 2), 3],
  [frac(3, 2), frac(3, -2), 3],
  [frac(3, 2), 2, frac(-1, 2)],
])("tests", (a: NumExp, b: NumExp, expected: NumExp) => {
  describe(`(${a}) - (${b}) => ${expected}`, () => {
    it(`${+a} - ${+b} => ${+expected}`, () => {
      const actual = +a - +b;

      expect(actual).toBe(+expected);
    } );
  } );
} );
