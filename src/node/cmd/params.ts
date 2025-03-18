export type SudoParams = {
  sudo: boolean;
};

function isSudo(params: SudoParams | boolean | object): boolean {
  if (typeof params === "object") {
    if ("sudo" in params)
      return params.sudo;

    return false;
  }

  return params;
}

export function getSudoStr(params: Partial<SudoParams> | SudoParams | boolean): string {
  if (isSudo(params))
    return "sudo";

  return "";
}
