import { lockr } from ".";

function classTest() {
  return class {
    static STATIC = 12;

    static STATIC_OBJ = {
      a: 1,
      b: 2,
    };

    private privateVar: number = 2;

    public publicVar = 3;
  };
}

function objTest() {
  return new (classTest())();
}

describe("immutable recursive (lockr)", () => {
  it("change privateVar", () => {
    const obj = objTest();

    lockr(obj);

    const t = () => {
      (<any>obj).privateVar = 22;
    };

    expect(t).toThrow(Error);
  } );

  it("new key", () => {
    const obj = objTest();

    lockr(obj);

    const t = () => {
      (<any>obj).asd = 22;
    };

    expect(t).toThrow(Error);
  } );

  it("change static obj", () => {
    const obj = classTest();

    lockr(obj);

    const t = () => {
      obj.STATIC_OBJ.a = 22;
    };

    expect(t).toThrow(Error);
  } );

  it("change static", () => {
    const obj = classTest();

    lockr(obj);

    const t = () => {
      obj.STATIC = 22;
    };

    expect(t).toThrow(Error);
  } );
} );
