import { Interval } from "./Interval";

export function contains<C>(self: Interval<C>, other: C): boolean {
  return (other > self.from && other < self.to)
          || (+other === +self.from && self.fromBound)
          || (+other === +self.to && self.toBound);
}

export function intersects<C>(self: Interval<C>, other: Interval<C>): boolean {
  if (self.to > other.from && self.from < other.to)
    return true;

  const selfFromBound = self.fromBound;
  const otherFromBound = other.fromBound;
  const selfToBound = self.toBound;
  const otherToBound = other.toBound;

  return (self.to === other.from && selfToBound && otherFromBound)
  || (self.from === other.to && selfFromBound && otherToBound);
}

export function stringify<C>(self: Interval<C>): string {
  return `${(self.fromBound ? "[" : "(")
  + self.from}, ${self.to
  }${self.toBound ? "]" : ")"}`;
}

export function union<C>(a: Interval<C>, b: Interval<C>): Interval<C> | null {
  if (!intersects(a, b))
    return null; // No se pueden unir si no se solapan

  return {
    from: a.from < b.from ? a.from : b.from,
    to: a.to > b.to ? a.to : b.to,
    fromBound: a.from < b.from ? a.fromBound : b.fromBound,
    toBound: a.to > b.to ? a.toBound : b.toBound,
  };
}

export function shift(interval: Interval<number>, delta: number): Interval<number> {
  return {
    ...interval,
    from: interval.from + delta,
    to: interval.to + delta,
  };
}

export function withFrom<C>(
  interval: Interval<C>,
  newFrom: C,
  bound = interval.fromBound,
): Interval<C> {
  return {
    ...interval,
    from: newFrom,
    fromBound: bound,
  };
}

export function withTo<C>(
  interval: Interval<C>,
  newTo: C,
  bound = interval.toBound,
): Interval<C> {
  return {
    ...interval,
    to: newTo,
    toBound: bound,
  };
}

export function normalize<C>(interval: Interval<C>): Interval<C> {
  if (interval.from > interval.to) {
    return {
      from: interval.to,
      to: interval.from,
      fromBound: interval.toBound,
      toBound: interval.fromBound,
    };
  }

  return interval;
}
