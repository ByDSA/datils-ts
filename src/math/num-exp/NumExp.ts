export abstract class NumExp {
    abstract valueOf(): number;

    toString() {
      return String(+this);
    }
}
