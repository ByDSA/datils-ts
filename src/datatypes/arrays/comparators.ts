export function hasSameContent<T>(a: T[], b: T[]): boolean {
  if (a === b)
    return true;

  if (a.length !== b.length)
    return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i])
      return false;
  }

  return true;
}

export function isDefined<A>(array: A[]): boolean {
  return !((array.length === 0 || array.length === 1)
    && (array[0] === undefined || array[0] === null));
}
