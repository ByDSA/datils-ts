import { CreateFn, GetKeyFn, Props, GetIdFn } from "./funcs";

export class KeyMappedFlyweightCache<T, Key, Id> {
  #cache: Map<Id, T>;

  #getId: GetIdFn<Key, Id>;

  #getKey: GetKeyFn<T, Key>;

  #create: CreateFn<T, Key>;

  constructor(
    { getId, getKey, create }: Props<T, Key, Id>,
  ) {
    this.#getId = getId;
    this.#getKey = getKey;
    this.#create = create;
    this.#cache = new Map<Id, T>();
  }

  add(obj: T): T {
    const key = this.#getKey(obj);
    const id = this.#getId(key);
    const cachedObj = this.#cache.get(id);

    if (cachedObj)
      return cachedObj;

    this.#cache.set(id, obj);

    return obj;
  }

  get(key: Key): T | undefined {
    const id: Id = this.#getId(key);

    return this.#getById(id);
  }

  // eslint-disable-next-line accessor-pairs
  get size() {
    return this.#cache.size;
  }

  #getById(id: Id): T | undefined {
    return this.#cache.get(id);
  }

  getOrCreate(key: Key): T {
    const id = this.#getId(key);
    let cachedObj: T | undefined = this.#getById(id);

    if (cachedObj === undefined) {
      cachedObj = this.#create(key);
      this.#cache.set(id, cachedObj);
    }

    return cachedObj;
  }

  clear() {
    this.#cache.clear();
  }

  exportEntries() {
    return [...this.#cache.entries()];
  }

  importEntries(entries: [Id, T][]) {
    entries.forEach(([id, obj]) => this.#cache.set(id, obj));
  }

  replaceAllEntries(entries: [Id, T][]) {
    this.#cache = new Map(entries);
  }
}
