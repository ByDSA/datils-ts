import { Arrays } from ".";

describe("right rotate", () => {
  it("empty", () => {
    const expected: number[] = [];
    const actual: number[] = [];

    Arrays.rotateRight(actual, 2);

    expect(actual).toStrictEqual(expected);
  } );

  it("default param: n=1", () => {
    const expected = [4, 0, 1, 2, 3];
    const actual = [0, 1, 2, 3, 4];

    Arrays.rotateRight(actual);

    expect(actual).toStrictEqual(expected);
  } );

  it("normal", () => {
    const expected = [3, 4, 0, 1, 2];
    const actual = [0, 1, 2, 3, 4];

    Arrays.rotateRight(actual, 2);

    expect(actual).toStrictEqual(expected);
  } );

  it("negative", () => {
    const expected = [2, 3, 4, 0, 1];
    const actual = [0, 1, 2, 3, 4];

    Arrays.rotateRight(actual, -2);

    expect(actual).toStrictEqual(expected);
  } );
} );

describe("left rotate", () => {
  it("empty", () => {
    const expected: number[] = [];
    const actual: number[] = [];

    Arrays.rotateLeft(actual, 2);

    expect(actual).toStrictEqual(expected);
  } );

  it("default param: n=1", () => {
    const expected = [1, 2, 3, 4, 0];
    const actual = [0, 1, 2, 3, 4];

    Arrays.rotateLeft(actual);

    expect(actual).toStrictEqual(expected);
  } );

  it("normal", () => {
    const expected = [2, 3, 4, 0, 1];
    const actual = [0, 1, 2, 3, 4];

    Arrays.rotateLeft(actual, 2);

    expect(actual).toStrictEqual(expected);
  } );

  it("negative", () => {
    const expected = [3, 4, 0, 1, 2];
    const actual = [0, 1, 2, 3, 4];

    Arrays.rotateLeft(actual, -2);

    expect(actual).toStrictEqual(expected);
  } );
} );
