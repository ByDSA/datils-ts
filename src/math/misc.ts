export function cyclicMod(a: number, n: number): number {
  return ((a % n) + n) % n;
}
