export function rotateLeft<T>(array: T[], n: number = 1): void {
  if (array.length === 0)
    return;

  if (n < 0) {
    rotateRight(array, -n);

    return;
  }

  for (let i = 0; i < n; i++)
    array.push(<T>array.shift());
}

export function rotateRight<T>(array: T[], n: number = 1): void {
  if (array.length === 0)
    return;

  if (n < 0) {
    rotateLeft(array, -n);

    return;
  }

  for (let i = 0; i < n; i++)
    array.unshift(<T>array.pop());
}
