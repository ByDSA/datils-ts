/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable func-names */
export function getCartesianProduct<T>(arr: T[][]) {
  return arr.reduce(function (a: T[][], b: T[]) {
    return a.map(function (x: T[]) {
      return b.map(function (y: T) {
        return x.concat([y]);
      } );
    } ).reduce(function (a: T[][], b: T[][]) { return a.concat(b); }, []);
  }, [[]]);
}

export function countCartesianProduct(arr: unknown[][]) {
  return arr.reduce((acc, g)=>acc * g.length, 1);
}
