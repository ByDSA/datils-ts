import Hashids from "hashids";
import { KeyMappedFlyweightCache } from "../KeyMappedFlyweightCache";
import { Props } from "../funcs";
import { TestClass, from, Key } from "./TestClass";
import { value1 } from "./Values";

beforeAll(() => {
  const funcs: Props<TestClass, Key, string> = {
    getId(key: Key): string {
      return new Hashids().encode([key.a, key.b]);
    },
    getKey(obj: TestClass): Key {
      return obj.getKey;
    },
    create(key: Key): TestClass {
      return new TestClass(key);
    },
  };

  TestClass.flyweightFactory = new KeyMappedFlyweightCache<TestClass, Key, string>(funcs);
} );

describe("functions", () => {
  beforeEach(() => {
    TestClass.flyweightFactory.clear();
  } );

  describe("initial status", () => {
    it("cache should not contain", () => {
      const get = TestClass.flyweightFactory.get(value1);

      expect(get).toBeUndefined();
    } );
  } );

  describe("add", () => {
    it("new value with constructor", () => {
      const key = value1;
      const obj = new TestClass(key);

      (<any>TestClass.flyweightFactory).add(obj);
      const get = TestClass.flyweightFactory.get(key);

      expect(get).toBeDefined();
    } );

    it("new value with from", () => {
      const key = value1;

      from(key);
      const got = TestClass.flyweightFactory.get(key);

      expect(got).toBeDefined();
    } );

    describe("re-add", () => {
      it("same reference", () => {
        const key = value1;
        const obj = new TestClass(key);
        const ret = TestClass.flyweightFactory.add(obj);
        const ret2 = TestClass.flyweightFactory.add(obj);

        expect(ret).toBe(ret2);
      } );

      describe("not same reference", () => {
        it("same key object reference. Second ignored one, returns old one", () => {
          const key = value1;
          const obj = new TestClass(key);
          const obj2 = new TestClass(key);
          const ret = TestClass.flyweightFactory.add(obj);
          const ret2 = TestClass.flyweightFactory.add(obj2);

          expect(ret).toBe(ret2);

          expect(TestClass.flyweightFactory.size).toBe(1);
        } );

        it("not same key object reference. Second one ignored, returns old one", () => {
          const key = value1;
          const keyCopy = {
            ...value1,
          };
          const obj = new TestClass(key);
          const objCopy = new TestClass(keyCopy);
          const ret = TestClass.flyweightFactory.add(obj);
          const ret2 = TestClass.flyweightFactory.add(objCopy);

          expect(ret).toBe(ret2);
          expect(TestClass.flyweightFactory.size).toBe(1);
        } );
      } );
    } );
  } );

  it("getOrCreate from same obj {a: 1, b: 2} twice returns the same obj", () => {
    const key = {
      a: 1,
      b: 2,
    };
    const obj = from(key);
    const obj2 = from(key);

    expect(obj).toBe(obj2);
  } );

  it("getOrCreate from different obj {a: 1, b: 2} twice returns the same obj", () => {
    const key = {
      a: 1,
      b: 2,
    };
    const key2 = {
      b: 2,
      a: 1,
    };
    const obj = from(key);
    const obj2 = from(key2);

    expect(obj).toBe(obj2);
  } );

  it("clear", () => {
    const key = {
      a: 1,
      b: 2,
    };
    const obj = from(key);

    TestClass.flyweightFactory.clear();
    const obj2 = from(key);

    expect(obj).not.toBe(obj2);
    expect(obj).toStrictEqual(obj2);
  } );
} );
