import { getPwdPath } from ".";

it("getPwdPath", () => {
  const actual = getPwdPath();

  expect(actual.includes("datils")).toBeTruthy();
} );
