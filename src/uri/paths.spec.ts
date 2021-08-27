import { getPwdPath } from "./paths";
it(`getPwdPath`, () => {
    const actual = getPwdPath();

    expect(actual.endsWith("datils-node")).toBeTruthy();
});