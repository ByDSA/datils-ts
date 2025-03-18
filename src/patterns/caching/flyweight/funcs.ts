export type GetKeyFn<T, Key> = (obj: T)=> Key;

export type CreateFn<T, Key> = (key: Key)=> T;

export type GetIdFn<Key, Id> = (key: Key)=> Id;

export type OnCreateFn<T, Key, Id> = (obj: T, key: Key, id: Id)=> void;

export type Props<T, Key, Id> = {
  getId: GetIdFn<Key, Id>;
  getKey: GetKeyFn<T, Key>;
  create: CreateFn<T, Key>;
};
