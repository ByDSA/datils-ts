export function replaceUnicodeByChar(text: string) {
  return text.replace(
    /\\u[\dA-F]{4}/gi,
    (match: string): string => String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16)),
  );
}

export function getBetween(
  str: string,
  begin: string,
  end: string,
  includeBegin = true,
  includeEnd = true,
): string | undefined {
  // Index B
  let indexB = str.indexOf(end);

  if (indexB < 0)
    return undefined;

  if (includeEnd)
    indexB += end.length;

  const fragmentUntilB = str.substring(0, indexB);
  // Index A
  let indexA = fragmentUntilB.lastIndexOf(begin);

  if (indexA < 0)
    return undefined;

  if (!includeBegin)
    indexA += begin.length;

  const fragmentAB = fragmentUntilB.substring(indexA);

  return fragmentAB;
}
