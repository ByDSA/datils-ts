export function getArgvOutFolder() {
  let outFolder: string | undefined;

  process.argv.forEach((arg) => {
    if (arg.startsWith("--out=") || arg.startsWith("--outFolder="))
      // eslint-disable-next-line prefer-destructuring
      outFolder = arg.split("=")[1];
  } );

  return outFolder;
}
