import { NumExp } from "../NumExp";
import { FracExp } from "./FracExp";

export function frac(numerator: NumExp, denominator: NumExp): FracExp {
  return new (FracExp as any)(numerator, denominator);
}
