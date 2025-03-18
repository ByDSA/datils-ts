import { pow } from "./Pow";

describe.each([
  [2, 5, 32],
])("frac", (num: number, den: number, expected: number) => {
  it(`${num} / ${den}`, () => {
    const actual = pow(num, den);

    expect(+actual).toBe(expected);
  } );
} );
