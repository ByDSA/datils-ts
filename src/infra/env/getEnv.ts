export function getEnv() {
  let ENV: string = "";

  process.argv.forEach((arg) => {
    if (arg.startsWith("--env=") || arg.startsWith("-e="))
      // eslint-disable-next-line prefer-destructuring
      ENV = arg.split("=")[1];
  } );

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
