import { NumExp } from "./NumExp";

export abstract class OneOpExp extends NumExp {
  arg0: NumExp;

  protected constructor(a: NumExp) {
    super();
    this.arg0 = a;
  }

  abstract valueOf(): number;

  abstract toString(): string;
}
