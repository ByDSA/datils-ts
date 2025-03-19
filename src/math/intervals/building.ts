import { Interval } from "./Interval";

type Inclusion = Partial<{
  fromInclusive: boolean;
  toInclusive: boolean;
}>;

const DEFAULT_INCLUSON: Inclusion = {
  fromInclusive: true,
  toInclusive: false,
};

export function of<C>(
  from: C,
  to: C,
  inclusion: Inclusion = DEFAULT_INCLUSON,
): Interval<C> {
  if (from > to) {
    return {
      from: to,
      fromInclusive: inclusion.toInclusive,
      to: from,
      toInclusive: inclusion.fromInclusive,
    };
  }

  return {
    from,
    to,
    ...inclusion,
  };
}
