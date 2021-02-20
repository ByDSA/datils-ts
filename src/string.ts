export function replaceUnicodeByChar(text: string) {
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match: string): string {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
};

export function getBetween(str: string, begin: string, end: string, includeBegin = true, includeEnd = true): string | undefined {
    // Index B
    let indexB = str.indexOf(end);
    if (indexB < 0)
        return undefined;

    if (includeEnd)
        indexB += end.length;

    let fragmentUntilB = str.substring(0, indexB);

    // Index A
    let indexA = fragmentUntilB.lastIndexOf(begin);

    if (indexA < 0)
        return undefined;
    if (!includeBegin)
        indexA += begin.length;

    let fragmentAB = fragmentUntilB.substring(indexA);

    return fragmentAB;
}