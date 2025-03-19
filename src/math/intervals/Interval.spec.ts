import { of } from "./building";
import { Interval } from "./Interval";
import { contains, intersects } from "./modifiers";

describe("contains", () => {
  it("3 in [0, 10)", () => {
    const interval = of(0, 10);
    const element = 3;
    const actual = contains(interval, element);
    const expected = true;

    expect(actual).toEqual(expected);
  } );

  it("-1 not in [0, 10)", () => {
    const interval = of(0, 10);
    const element = -1;
    const actual = contains(interval, element);
    const expected = false;

    expect(actual).toEqual(expected);
  } );

  it("0 in [0, 10)", () => {
    const interval = of(0, 10);
    const element = 0;
    const actual = contains(interval, element);
    const expected = true;

    expect(actual).toEqual(expected);
  } );

  it("10 not in [0, 10)", () => {
    const interval = of(0, 10);
    const element = 10;
    const actual = contains(interval, element);

    expect(actual).toBeFalsy();
  } );

  it("10 in [0, 10]", () => {
    const obj = {
      from: 0,
      fromInclusive: true,
      to: 10,
      toInclusive: true,
    };
    const interval: Interval<number> = obj;
    const element = 10;
    const actual = contains(interval, element);

    expect(actual).toBeTruthy();
  } );

  it("0 in (0, 10)", () => {
    const obj = {
      from: 0,
      fromInclusive: false,
      to: 10,
      toInclusive: false,
    };
    const interval: Interval<number> = obj;
    const element = 0;
    const actual = contains(interval, element);

    expect(actual).toBeFalsy();
  } );
} );

describe("intersects", () => {
  it("[0,1) and [2,4)", () => {
    const interval1 = of(0, 1);
    const interval2 = of(2, 4);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
  } );

  it("[0,1] and itself", () => {
    const interval1 = of(0, 1);
    const interval2 = of(0, 1);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeTruthy();
    expect(intersects2).toBeTruthy();
  } );

  it("[0,1) and [1,2)", () => {
    const interval1 = of(0, 1);
    const interval2 = of(1, 2);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
  } );

  it("[0,1] and [1,2)", () => {
    const interval1 = of(0, 1, {
      toInclusive: true,
    } );
    const interval2 = of(1, 2);
    const intersects1 = intersects(interval1, interval2);
    const intersects2 = intersects(interval2, interval1);

    expect(intersects1).toBeTruthy();
    expect(intersects2).toBeTruthy();
  } );
} );

it("info", () => {
  const expectedInterval = of(0, 1);

  expect(expectedInterval.from).toBe(0);
  expect(expectedInterval.to).toBe(1);
} );

describe("from > to", () => {
  const expected = of(0, 1);
  const actual = of(1, 0);

  it("integer values", () => {
    expect(actual.from).toBe(expected.from);
    expect(actual.to).toBe(expected.to);
  } );

  it("inclusive values", () => {
    expect(actual.fromInclusive).not.toBe(expected.fromInclusive);
    expect(actual.toInclusive).not.toBe(expected.toInclusive);
  } );
} );
