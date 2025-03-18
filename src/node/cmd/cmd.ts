import { createInterface } from "node:readline";

function getBooleanSure(sure: string) {
  switch (sure) {
    case "y":
    case "yes":
    case "true":
    case "1":
      return true;
    default:
      return false;
  }
}

export async function questionYesNo(str: string) {
  const sure = await question(str);

  return getBooleanSure(sure);
}

// source: zx
export function question(
  query?: string,
  options?: { choices: string[] },
): Promise<string> {
  let completer;

  if (options && Array.isArray(options.choices)) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    completer = function completer(line: string) {
      const completions = options.choices;
      const hits = completions.filter((c) => c.startsWith(line));

      return [hits.length ? hits : completions, line];
    };
  }

  const rl = createInterface( {
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    completer,
  } );

  return new Promise((resolve) => rl.question(query ?? "", (answer) => {
    rl.close();
    resolve(answer);
  } ));
}
