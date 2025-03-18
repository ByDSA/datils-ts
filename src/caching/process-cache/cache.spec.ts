import { ProcessCache } from "./ProcessCache";

describe("functions", () => {
  const cache = new ProcessCache((num: number) => ( {
    num,
  } ));

  beforeEach(() => {
    cache.clear();
  } );

  describe("initial status", () => {
    it("cache should not contain", () => {
      const get = cache.get(2);

      expect(get).toBeUndefined();
    } );
  } );

  describe("put", () => {
    it("put + get", () => {
      cache.put(2, {
        num: 2,
      } );
      const get = cache.get(2);

      expect(get).toBeDefined();
    } );

    it("put twice = replace", () => {
      cache.put(2, {
        num: 2,
      } );
      const obj1 = cache.get(2);

      cache.put(2, {
        num: 2,
      } );
      const obj2 = cache.get(2);

      expect(obj1).not.toBe(obj2);
    } );
  } );

  describe("getOrProcess", () => {
    it("got ok", () => {
      const got = cache.getOrProcess(2);

      expect(got).toBeDefined();
    } );

    it("twice = same", () => {
      const got1 = cache.getOrProcess(2);
      const got2 = cache.getOrProcess(2);

      expect(got1).toBe(got2);
    } );
  } );

  describe("clear", () => {
    it("get", () => {
      cache.getOrProcess(2);

      cache.clear();
      const got = cache.get(2);

      expect(got).toBeUndefined();
    } );

    it("getOrProcess", () => {
      const got1 = cache.getOrProcess(2);

      cache.clear();
      const got2 = cache.getOrProcess(2);

      expect(got1).not.toBe(got2);
    } );
  } );
} );
