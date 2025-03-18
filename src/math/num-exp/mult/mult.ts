/* eslint-disable import/no-cycle */
import { FracExp } from "../frac";
import { NumExp } from "../NumExp";
import { PowExp } from "../pow/PowExp";
import { multFrac } from "./frac";
import { multPow } from "./pow";

export function mult(self: NumExp, other: NumExp): NumExp {
  if (self instanceof FracExp)
    return multFrac(self, other);

  if (other instanceof FracExp)
    return multFrac(other, self);

  if (self instanceof PowExp)
    return multPow(self, other);

  if (other instanceof PowExp)
    return multPow(other, self);

  return +self * +other;
}
