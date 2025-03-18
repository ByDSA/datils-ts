import { Arrays } from ".";

describe("remove", () => {
  it("item is multiple times", () => {
    const array = [1, 2, 3, 2, 1];
    const item = 1;
    const initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(true);
    expect(array).toHaveLength(initialSize - 1);
    expect(array).toStrictEqual([2, 3, 2, 1]);
  } );

  it("item is one time", () => {
    const array = [1, 2, 3, 4];
    const item = 1;
    const initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(true);
    expect(array).toHaveLength(initialSize - 1);
    expect(array).toStrictEqual([2, 3, 4]);
  } );

  it("item not found", () => {
    const array = [1, 2, 3, 4];
    const item = 5;
    const initialSize = array.length;

    expect(Arrays.removeItem(array, item)).toBe(false);
    expect(array).toHaveLength(initialSize);
    expect(array).toStrictEqual([1, 2, 3, 4]);
  } );
} );
