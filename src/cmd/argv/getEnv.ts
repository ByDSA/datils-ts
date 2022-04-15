import { argv } from "zx";

export default function getEnv() {
  const ENV = argv.env ?? argv.e;

  switch (ENV) {
    case "d":
    case "dev":
    case "development":
      return "development";
    case "p":
    case "prod":
    case "production":
    default:
      return "production";
  }
}
