import { add } from "../add/add";
import { frac } from "../frac/Frac";
import { mult } from "../mult/mult";
import { NumExp } from "../NumExp";
import { pow } from "../pow/Pow";
import { sub } from "../sub/sub";
import { abs } from "./Abs";

describe.each([
  [2, 2],
  [-2, 2],
  [frac(1, 2), frac(1, 2)],
  [frac(-1, 2), frac(1, 2)],
  [sub(3, 2), 1],
  [sub(2, 3), 1],
  [add(2, -3), 1],
  [add(2, 3), 5],
  [mult(-2, -3), 6],
  [mult(-2, 3), 6],
  [pow(2, 2), pow(2, 2)],
])("tests", (arg: NumExp, expected: NumExp) => {
  it(`${+arg} => ${+expected}`, () => {
    const actual = abs(arg);

    expect(+actual).toBe(+expected);
  } );
} );
