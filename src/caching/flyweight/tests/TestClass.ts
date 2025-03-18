import { KeyMappedFlyweightCache } from "../KeyMappedFlyweightCache";

export type Key = {
  a: number;
  b: number;
};

export class TestClass {
  private key: Key;

  // eslint-disable-next-line no-use-before-define
  static flyweightFactory: KeyMappedFlyweightCache<TestClass, Key, string>;

  constructor(params: Key) {
    this.key = params;
  }

  // eslint-disable-next-line accessor-pairs
  get getKey(): Key {
    return this.key;
  }
}

export function from(params: Key) {
  return TestClass.flyweightFactory.getOrCreate(params);
}
