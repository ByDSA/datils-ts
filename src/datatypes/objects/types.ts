/* eslint-disable @typescript-eslint/no-empty-object-type */
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

export type OnlyWithRequiredKeys<T> = Pick<T, RequiredKeys<T>>;

export type ExcludeByPropType<T, U> = Pick<T, {
  [K in keyof T]: T[K] extends U ? never : K;
}[keyof T]>;

export type OptionalProps<T> = ExcludeByPropType<{
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? T[K] : never;
}, never>;

export type NonEmptyObject<T> = keyof T extends never ? never : T;

export type OptionalPropsRecursive<T> = ExcludeByPropType<{
  [K in keyof T]-?: T[K] extends object
    ? NonEmptyObject<OptionalPropsRecursive<T[K]>>
    : {} extends { [P in K]: T[K] }
  ? T[K]
  : never;
}, never>;

export type PartialRecursive<T> = {
  [K in keyof T]?: T[K] extends object ? PartialRecursive<T[K]> : Partial<T[K]>;
};
