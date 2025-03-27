import { between } from "./building";
import { Interval } from "./Interval";
import { contains, intersects } from "./modifiers";
import { isInterval, isValidInterval } from "./validation";

describe("contains", () => {
  it("3 in [0, 10)", () => {
    const interval = between(0, 10);
    const element = 3;
    const actual = contains(interval, element);
    const expected = true;

    expect(actual).toEqual(expected);
  } );

  it("-1 not in [0, 10)", () => {
    const interval = between(0, 10);
    const element = -1;
    const actual = contains(interval, element);
    const expected = false;

    expect(actual).toEqual(expected);
  } );

  it("0 in [0, 10)", () => {
    const interval = between(0, 10);
    const element = 0;
    const actual = contains(interval, element);
    const expected = true;

    expect(actual).toEqual(expected);
  } );

  it("10 not in [0, 10)", () => {
    const interval = between(0, 10);
    const element = 10;
    const actual = contains(interval, element);

    expect(actual).toBeFalsy();
  } );

  it("10 in [0, 10]", () => {
    const obj = {
      from: 0,
      fromBound: true,
      to: 10,
      toBound: true,
    };
    const interval: Interval<number> = obj;
    const element = 10;
    const actual = contains(interval, element);

    expect(actual).toBeTruthy();
  } );

  it("0 in (0, 10)", () => {
    const obj = {
      from: 0,
      fromBound: false,
      to: 10,
      toBound: false,
    };
    const interval: Interval<number> = obj;
    const element = 0;
    const actual = contains(interval, element);

    expect(actual).toBeFalsy();
  } );
} );

describe("intersects", () => {
  it("[0,1) and [2,4)", () => {
    const interval1 = between(0, 1);
    const interval2 = between(2, 4);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
  } );

  it("[0,1] and itself", () => {
    const interval1 = between(0, 1);
    const interval2 = between(0, 1);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeTruthy();
    expect(intersects2).toBeTruthy();
  } );

  it("[0,1) and [1,2)", () => {
    const interval1 = between(0, 1);
    const interval2 = between(1, 2);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
  } );

  it("[0,1] and [1,2)", () => {
    const interval1 = between(0, 1, {
      to: true,
    } );
    const interval2 = between(1, 2);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeTruthy();
    expect(intersects2).toBeTruthy();
  } );
} );

it("info", () => {
  const expectedInterval = between(0, 1);

  expect(expectedInterval.from).toBe(0);
  expect(expectedInterval.to).toBe(1);
} );

describe("building: from > to", () => {
  const normal = between(0, 1); // [0,1)
  const reversed = between(1, 0); // (0, 1]

  it("integer values", () => {
    expect(reversed.from).toBe(normal.from); // 0
    expect(reversed.to).toBe(normal.to); // 1
  } );

  it("bound values", () => {
    expect(normal.fromBound).toBeTruthy();
    expect(normal.toBound).toBeFalsy();
    expect(reversed.fromBound).toBeFalsy();
    expect(reversed.toBound).toBeTruthy();
    expect(reversed.fromBound).not.toBe(normal.fromBound);
    expect(reversed.toBound).not.toBe(normal.toBound);
  } );
} );

describe("validation", ()=> {
  describe("isInterval", () => {
    it("ok", () => {
      const interval = {
        from: 0,
        to: 1,
      };

      expect(isInterval(interval)).toBeTruthy();
    } );

    it("any object should return false", () => {
      const interval = {
        from: 1234,
        asdf: 1234,
      };

      expect(isInterval(interval)).toBeFalsy();
    } );

    it("from > to should return true", () => {
      const interval = {
        from: 1,
        to: 0,
      };

      expect(isInterval(interval)).toBeTruthy();
    } );
  } );

  describe("isValidInterval", () => {
    it("ok", () => {
      const interval = {
        from: 0,
        fromBound: true,
        to: 1,
        toBound: false,
      };

      expect(isValidInterval(interval)).toBeTruthy();
    } );

    it("from=to with closed bound should return true", () => {
      const interval = {
        from: 1234,
        to: 1234,
        fromBound: true,
        toBound: true,
      };

      expect(isValidInterval(interval)).toBeTruthy();
    } );

    it("from=to with open bounds should return false", () => {
      const interval = {
        from: 1234,
        to: 1234,
        fromBound: false,
        toBound: false,
      };

      expect(isValidInterval(interval)).toBeFalsy();
    } );

    it("from > to should return false", () => {
      const interval = {
        from: 1,
        to: 0,
        fromBound: true,
        toBound: false,
      };

      expect(isValidInterval(interval)).toBeFalsy();
    } );
  } );
} );
