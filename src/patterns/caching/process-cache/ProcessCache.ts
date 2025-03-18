import { AfterProcess } from "./AfterProcess";
import { Process } from "./Process";

export class ProcessCache<I, O> {
  #map: Map<I, O>;

  #process: Process<I, O>;

  #afterProcess?: AfterProcess<I, O>;

  constructor(process: Process<I, O>, afterProcess?: AfterProcess<I, O>) {
    this.#process = process;
    this.#map = new Map<I, O>();
    this.#afterProcess = afterProcess;
  }

  put(input: I, output: O): ProcessCache<I, O> {
    this.#map.set(input, output);

    return this;
  }

  get(obj: I): O | undefined {
    return this.#map.get(obj);
  }

  getOrProcess(obj: I, afterProcess?: AfterProcess<I, O>): O {
    let result = this.get(obj);

    if (result === undefined) {
      result = this.#process(obj);
      this.#map.set(obj, result);

      if (this.#afterProcess)
        this.#afterProcess(obj, result);

      if (afterProcess)
        afterProcess(obj, result);
    }

    return result;
  }

  clear() {
    this.#map.clear();
  }

  serialize() {
    return [...this.#map.entries()];
  }

  putAll(entries: [I, O][]) {
    entries.forEach(([key, value]) => this.put(key, value));
  }

  initialize(entries: [I, O][]) {
    this.#map = new Map(entries);
  }
}
