import { getAvailableFile } from "./files";

it("File exists, get another new name", () => {
  const path = "tests/tmp/aa.txt";
  const file = getAvailableFile(path);
  const expected = "tests/tmp/aa (2).txt";

  expect(file).toMatch(expected);
} );

it("File exists with (2), get another new name", () => {
  const path = "tests/tmp/bb (2).txt";
  const file = getAvailableFile(path);
  const expected = "tests/tmp/bb (3).txt";

  expect(file).toMatch(expected);
} );

it("File does not exists, get same name", () => {
  const path = "test/tmp/notexists.txt";
  const file = getAvailableFile(path);

  expect(file).toMatch(path);
} );
