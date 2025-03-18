export class Argv {
  #argv: string[] = [];

  push(...args: (Argv | string)[]) {
    for (const a of args) {
      if (typeof a === "string")
        this.#argv.push(a);
      else
        this.#argv.push(...a.#argv);
    }
  }

  toString() {
    return this.#argv.filter((a) => a).join(" ");
  }
}
