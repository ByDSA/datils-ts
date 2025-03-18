import { NumExp } from "./NumExp";
import { OneOpExp } from "./OneOpExp";

export abstract class TwoOpExp extends OneOpExp {
  arg1: NumExp;

  protected constructor(a: NumExp, b: NumExp) {
    super(a);
    this.arg1 = b;
  }

  abstract valueOf(): number;

  abstract toString(): string;
}
