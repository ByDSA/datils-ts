import { Interval } from "./Interval";

export function contains<C>(self: Interval<C>, other: C): boolean {
  const fromInclusive = self.fromInclusive || false;
  const toInclusive = self.toInclusive || false;

  return (other > self.from && other < self.to)
          || (+other === +self.from && fromInclusive)
          || (+other === +self.to && toInclusive);
}

export function intersects<C>(self: Interval<C>, other: Interval<C>): boolean {
  if (self.to > other.from && self.from < other.to)
    return true;

  const selfFromInclusive = self.fromInclusive || false;
  const otherFromInclusive = other.fromInclusive || false;
  const selfToInclusive = self.toInclusive || false;
  const otherToInclusive = other.toInclusive || false;

  return (self.to === other.from && selfToInclusive && otherFromInclusive)
  || (self.from === other.to && selfFromInclusive && otherToInclusive);
}

export function stringify<C>(self: Interval<C>): string {
  return `${(self.fromInclusive ? "[" : "(")
  + self.from}, ${self.to
  }${self.toInclusive ? "]" : ")"}`;
}
