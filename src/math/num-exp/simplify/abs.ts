import { AbsExp } from "../abs";
import { frac, FracExp } from "../frac";
import { NumExp } from "../NumExp";

export function simplifyAbs(exp: AbsExp): NumExp {
  if (typeof exp.arg0 === "number")
    return Math.abs(exp.arg0);

  if (exp.arg0 instanceof FracExp)
    return frac(exp.arg0.numerator, exp.arg0.denominator);

  return exp;
}
