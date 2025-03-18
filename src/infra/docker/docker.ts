import { SudoParams } from "../../cmd/params";

export type DockerParams = Partial<SudoParams & {
  env: string;
  dettach: boolean;
}>;
