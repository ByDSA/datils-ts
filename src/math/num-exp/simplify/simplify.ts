import { AbsExp } from "../abs/AbsExp";
import { NumExp } from "../NumExp";
import { simplifyAbs } from "./abs";

export function simplify(obj: NumExp): NumExp {
  if (obj instanceof AbsExp)
    return simplifyAbs(obj);

  return obj;
}
