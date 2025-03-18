/* eslint-disable import/no-cycle */
import { AbsExp } from "../abs/AbsExp";
import { frac } from "../frac/Frac";
import { FracExp } from "../frac/FracExp";
import { NumExp } from "../NumExp";

export function simplifyAbs(exp: AbsExp): NumExp {
  if (typeof exp.arg0 === "number")
    return Math.abs(exp.arg0);

  if (exp.arg0 instanceof FracExp)
    return frac(exp.arg0.numerator, exp.arg0.denominator);

  return exp;
}
