import { execSync } from "child_process";

type Pattern = string;
type FindParams = {
  pattern: Pattern;
  folder?: string;
};
export default function find(params: FindParams | Pattern): string[] {
  const cmd = calculateCmd(params);
  const files = execSync(cmd).toString()
    .split("\n")
    .filter((n) => n);

  return files;
}

function calculateCmd(params: FindParams | Pattern): string {
  const folder = typeof params === "object" ? params.folder : undefined ?? ".";
  const pattern = typeof params === "object" ? params.pattern : params;

  return `find "${folder}" -type f -name "${pattern}"`;
}
