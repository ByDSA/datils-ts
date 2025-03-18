export function addArray<T>(set: Set<T>, array: T[]): void {
  array.forEach(set.add, set);
}

export function addSet<T>(sourceSet: Set<T>, anotherSet: Set<T>): void {
  anotherSet.forEach(sourceSet.add, sourceSet);
}
