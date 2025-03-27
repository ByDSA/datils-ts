import { Interval } from "./Interval";
import { stringify } from "./modifiers";

export function isInterval<E>(obj: any): obj is Interval<E> {
  return obj && typeof obj.from === "number" && typeof obj.to === "number";
}

export function isValidInterval<T>(interval: Interval<T>): boolean {
  const { from, to, fromBound, toBound } = interval;

  if (from < to)
    return true;

  if (from === to) {
    if (fromBound && toBound)
      return true; // [a, a] es válido

    return false; // (a, a), (a, a] y [a, a]  no son válidos
  }

  return false; // from > to
}

export function assertIsValidInterval<T>(interval: Interval<T>) {
  if (!isValidInterval(interval))
    throw new Error("Invalid interval: " + stringify(interval));
}
