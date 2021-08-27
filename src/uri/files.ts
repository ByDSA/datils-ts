
import * as fs from "fs";
import * as path from 'path';

export function removeExtensionOf(uri) {
    return uri.substring(0, uri.lastIndexOf("."));
};

export type RenamedNumberType = { num: number, name: string };
export function getAvailableFile(pathString: string): string {
    const folders = path.dirname(pathString);
    if (fs.existsSync(pathString)) {
    const basename = path.basename(pathString);
        const lastPointIndex: number = basename.lastIndexOf(".");
        const nameWithoutExt = lastPointIndex < 0 ? basename : basename.substr(0, lastPointIndex);
        const extension = lastPointIndex < 0 ? "" : basename.substr(lastPointIndex + 1);
        const renamedNumber: RenamedNumberType = getRenamedNumber(nameWithoutExt);

        if (renamedNumber.num < 0)
            renamedNumber.num = 1;

        for (let n = renamedNumber.num + 1; true; n++) {
            pathString = `${folders}/${renamedNumber.name} (${n}).${extension}`;
            if (!fs.existsSync(pathString))
            break;
        }
    }

    return pathString;
}

function getRenamedNumber(basenameWithoutExt: string): RenamedNumberType {
    const NOT_FOUND = { num: -1, name: basenameWithoutExt };

    const numberWithParsMatch = basenameWithoutExt.match('\\((\\d)+\\)$');
    if (!numberWithParsMatch)
        return NOT_FOUND;

    const numberWithPars: string = numberWithParsMatch[0];
    const renamedNumberMatch = numberWithPars.match("\\d+");
    if (!renamedNumberMatch)
        return NOT_FOUND;

    const nameWithoutNumber = basenameWithoutExt.substr(0, numberWithParsMatch.index).trim();

    return { num: +renamedNumberMatch[0], name: nameWithoutNumber };
}