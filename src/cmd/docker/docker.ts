import { SudoParams } from "../params.ts";

export type DockerParams = Partial<SudoParams & {
  env: string;
  dettach: boolean;
}>;
