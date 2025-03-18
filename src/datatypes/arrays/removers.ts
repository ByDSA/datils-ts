export function removeItem<T>(array: T[], item: T): boolean {
  const index = array.indexOf(item);

  if (index >= 0 && index < array.length) {
    array.splice(index, 1);

    return true;
  }

  return false;
}
