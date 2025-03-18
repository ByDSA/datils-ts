import { NumExp } from "../NumExp";
import { AbsExp } from "./AbsExp";

export function abs(value: NumExp): AbsExp {
  return new (AbsExp as any)(value);
}
