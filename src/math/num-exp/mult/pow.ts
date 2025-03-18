import { add } from "../add";
import { NumExp } from "../NumExp";
import { PowExp } from "../pow";
import { pow2, Pow2Exp } from "../pow2";
import { MultExp } from "./MultExp";

export function multPow(self: PowExp, other: NumExp): NumExp {
  if (other instanceof PowExp) {
    if (self.arg0 === other.arg0) {
      const exp = add(self.arg1, other.arg1);

      return pow2(exp);
    }
  }

  if (self instanceof Pow2Exp) {
    if (typeof other === "number") {
      const logn2 = Math.log2(other);

      if (logn2 % 1 === 0) {
        const exp = add(self.arg1, logn2);

        return pow2(exp);
      }
    }
  }

  return new (MultExp as any)(self, other);
}
