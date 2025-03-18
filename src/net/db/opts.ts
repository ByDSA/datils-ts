export type DBOptions = {
  name: string;
  host: string;
  port?: number;
  password: string;
  username: string;
  dockerContainer?: string;
};

export const DEFAULT_OPTS: DBOptions = {
  name: "root",
  host: "localhost",
  password: "",
  username: "root",
};
