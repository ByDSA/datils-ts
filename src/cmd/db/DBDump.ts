import { DBOptions } from "./opts";

export type DBDumpParams = DBOptions & {
  outFile: string;
};

export default abstract class DBDump {
  constructor(public readonly params: Readonly<DBDumpParams>) {
  }

  abstract dump(params: Partial<Readonly<DBDumpParams>>): void;
}
