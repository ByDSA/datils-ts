import { NumExp } from "../NumExp";
import { PowExp } from "../pow/PowExp";

export class Pow2Exp extends PowExp {
  private constructor(arg1: NumExp) {
    super(2, arg1);
  }

  toString() {
    return `2 ^ (${this.arg1})`;
  }
}
