export function removeItem<T>(array: T[], item: T): boolean {
  const index = array.indexOf(item);

  if (index >= 0 && index < array.length) {
    array.splice(index, 1);

    return true;
  }

  return false;
}

export function removeNulls<T>(array: (T | null)[]): asserts array is T[] {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === null) {
      array.splice(i, 1);
      i--;
    }
  }
}
