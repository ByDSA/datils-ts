import { NumExp } from "../NumExp";
import { Pow2Exp } from "./Pow2Exp";

export function pow2(exp: NumExp): NumExp {
  if (typeof exp === "number")
    return 2 ** exp;

  return new (Pow2Exp as any)(exp);
}
