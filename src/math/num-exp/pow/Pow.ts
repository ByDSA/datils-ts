import { NumExp } from "../NumExp";
import { PowExp } from "./PowExp";

export function pow(base: NumExp, exp: NumExp): NumExp {
  if (typeof base === "number" && typeof exp === "number")
    return base ** exp;

  return new (PowExp as any)(base, exp);
}
