import { mult } from "..";
import { add } from "../add";
import { NumExp as Ratio } from "../NumExp";

export function sub(self: Ratio, other: Ratio): Ratio {
  return add(self, mult(other, -1));
}
