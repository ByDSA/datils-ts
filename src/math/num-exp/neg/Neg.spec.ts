import { add } from "../add";
import { frac } from "../frac";
import { mult } from "../mult";
import { NumExp } from "../NumExp";
import { pow } from "../pow";
import { sub } from "../sub";
import { neg } from "./Neg";

describe.each([
  [2, -2],
  [-2, 2],
  [frac(1, 2), frac(-1, 2)],
  [frac(-1, 2), frac(1, 2)],
  [sub(3, 2), sub(2, 3)],
  [sub(2, 3), sub(3, 2)],
  [add(2, -3), add(-2, 3)],
  [add(2, 3), add(-2, -3)],
  [mult(-2, -3), mult(2, -3)],
  [mult(-2, 3), mult(2, 3)],
  [pow(2, 2), -4],
])("tests", (arg: NumExp, expected: NumExp) => {
  describe(`-(${arg}) => ${expected}`, () => {
    it(`${+arg} => ${+expected}`, () => {
      const actual = neg(arg);

      expect(+actual).toBe(+expected);
    } );
  } );
} );
