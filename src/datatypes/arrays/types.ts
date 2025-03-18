export type NonEmpty<T> = [T, ...T[]];

export type Number = NonEmpty<number>;
