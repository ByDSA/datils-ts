import { Bound } from "./Bound";
import { Interval } from "./Interval";
import { normalize } from "./modifiers";

type Bounds = Partial<{
  from: boolean;
  to: boolean;
}>;

export const DEFAULT_BOUNDS: Required<Bounds> = {
  from: Bound.CLOSED,
  to: Bound.OPEN,
};

export function between<C>(
  from: C,
  to: C,
  bounds?: Bounds,
): Interval<C> {
  const toBound = bounds?.to ?? DEFAULT_BOUNDS.to;
  const fromBound = bounds?.from ?? DEFAULT_BOUNDS.from;

  return normalize( {
    from,
    to,
    fromBound: fromBound,
    toBound: toBound,
  } );
}

export function fromAtDuration(at: number, duration: number, bounds?: Bounds): Interval<number> {
  const to = at + +duration;

  return between(at, to, bounds);
}
