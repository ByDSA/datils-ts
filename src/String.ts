export function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
};

export function fragment(str, a, b, begin = true, end = true) {
    // Index B
    let indexB = str.indexOf(b);
    if (indexB < 0)
        return null;

    if (end)
        indexB += b.length;

    let fragmentUntilB = str.substring(0, indexB);

    // Index A
    let indexA = fragmentUntilB.lastIndexOf(a);

    if (indexA < 0)
        return null;
    if (!begin)
        indexA += a.length;

    let fragmentAB = fragmentUntilB.substring(indexA);

    return fragmentAB;
}