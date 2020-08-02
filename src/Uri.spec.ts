import { getAvailableFile } from "./Uri";

it('File exists, get another new name', () => {
    const path = "C:/Users/Daniel/Desktop/aa.txt";
    const file = getAvailableFile(path);
    const expected = "C:/Users/Daniel/Desktop/aa (2).txt";

    expect(file).toMatch(expected);
});

it('File exists with (2), get another new name', () => {
    const path = "C:/Users/Daniel/Desktop/bb (2).txt";
    const file = getAvailableFile(path);
    const expected = "C:/Users/Daniel/Desktop/bb (3).txt";

    expect(file).toMatch(expected);
});

it('File does not exists, get same name', () => {
    const path = "C:/Users/Daniel/Desktop/notexists.txt";
    const file = getAvailableFile(path);

    expect(file).toMatch(path);
});