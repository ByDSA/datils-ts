export function freeze<T>(obj: T): T {
  return Object.freeze(Object.preventExtensions(obj));
}

export function deepFreeze<T extends object>(object: T): T {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = (object as any)[name];

    if ((value && typeof value === "object")
      || (typeof value === "function" && name !== "constructor"))
      deepFreeze(value);
  }

  return Object.freeze(object);
}
