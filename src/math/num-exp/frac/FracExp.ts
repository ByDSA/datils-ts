import { abs } from "../abs";
import { mult } from "../mult";
import { NumExp } from "../NumExp";
import { Sign } from "../Sign";
import { simplifyAbs } from "../simplify/abs";

export class FracExp extends NumExp {
  numerator: NumExp;

  denominator: NumExp;

  sign: Sign;

  private constructor(numerator: NumExp, denominator: NumExp) {
    super();
    this.numerator = simplifyAbs(abs(numerator));
    this.denominator = simplifyAbs(abs(denominator));

    if (+mult(numerator, denominator) >= 0)
      this.sign = Sign.POSITIVE;
    else
      this.sign = Sign.NEGATIVE;
  }

  valueOf(): number {
    const divWithoutSign = +this.numerator / +this.denominator;

    if (this.sign === Sign.POSITIVE)
      return divWithoutSign;

    return -divWithoutSign;
  }

  toString() {
    const str = `${this.numerator}/${this.denominator}`;

    if (this.sign === Sign.NEGATIVE)
      return `-${str}`;

    return str;
  }
}
