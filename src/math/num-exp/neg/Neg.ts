import { NumExp } from "../NumExp";
import { NegExp } from "./NegExp";

export function neg(value: NumExp): NumExp {
  return new (NegExp as any)(value);
}
