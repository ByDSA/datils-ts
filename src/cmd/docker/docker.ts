import { SudoParams } from "../params";

export type DockerParams = Partial<SudoParams & {
  env: string;
  dettach: boolean;
}>;
