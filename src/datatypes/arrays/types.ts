export type NonEmpty<T> = [T, ...T[]];

export type NonEmptyNumber = NonEmpty<number>;

export type ArrayMinTwo<T> = [T, T, ...T[]];
