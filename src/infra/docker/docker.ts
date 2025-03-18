import { SudoParams } from "../../node/cmd/params";

export type DockerParams = Partial<SudoParams & {
  env: string;
  dettach: boolean;
}>;
