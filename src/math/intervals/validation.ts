import { Interval } from "./Interval";

export function isInterval<E>(obj: any): obj is Interval<E> {
  return obj && typeof obj.from === "number" && typeof obj.to === "number";
}
