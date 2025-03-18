/* eslint-disable no-restricted-syntax */
export class SetComparator<T> {
  #common = new Set<T>();

  #different = new Set<T>();

  #calculated: boolean;

  constructor(private sets: Set<T>[]) {
    this.#calculated = false;
  }

  compare(): void {
    this.addAllValuesToCommon();
    this.removeNonCommonValues();
    this.#calculated = true;
  }

  private addAllValuesToCommon(): void {
    for (const set of this.sets) {
      for (const value of set)
        this.#common.add(value);
    }
  }

  private removeNonCommonValues(): void {
    mainFor: for (const value of this.#common) {
      for (const set of this.sets) {
        if (!set.has(value)) {
          this.#common.delete(value);
          this.#different.add(value);
          continue mainFor;
        }
      }
    }
  }

  getCommon(): Set<T> {
    this.errorIfNotCalculated();

    return this.#common;
  }

  getDifferent(): Set<T> {
    this.errorIfNotCalculated();

    return this.#different;
  }

  private errorIfNotCalculated() {
    if (!this.#calculated)
      throw new Error("Not calculated yet");
  }
}
