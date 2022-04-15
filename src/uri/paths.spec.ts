import { getPwdPath } from "./paths";

it("getPwdPath", () => {
  const actual = getPwdPath();

  expect(actual.endsWith("datils")).toBeTruthy();
} );
