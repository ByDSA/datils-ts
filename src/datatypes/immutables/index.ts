type F = (t: any)=> boolean;
type OBJ = any | [string];

export function lock<T>(obj: T): T {
  return Object.freeze(Object.preventExtensions(obj));
}

export function lockr(obj: OBJ): Readonly<OBJ> {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object" && !Object.isFrozen(obj[prop]))
      lockr(obj[prop]);
  } );

  return Object.freeze(obj);
}

export function lockrIf(obj: OBJ, ifFunction: F = () => true): Readonly<OBJ> {
  if (!ifFunction(obj))
    return obj;

  return lock(obj);
}
