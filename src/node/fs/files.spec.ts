import { getAvailableFile } from "./files";

it("file exists, get another new name", () => {
  const path = "tests/tmp/aa.txt";
  const file = getAvailableFile(path);
  const expected = "tests/tmp/aa (2).txt";

  expect(file).toMatch(expected);
} );

it("file exists with (2), get another new name", () => {
  const path = "tests/tmp/bb (2).txt";
  const file = getAvailableFile(path);
  const expected = "tests/tmp/bb (3).txt";

  expect(file).toMatch(expected);
} );

it("file does not exists, get same name", () => {
  const path = "test/tmp/notexists.txt";
  const file = getAvailableFile(path);

  expect(file).toMatch(path);
} );
