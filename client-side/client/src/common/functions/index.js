export const clearNullObject = (object) => {
  for (var key in object) {
    if (
      object[key] === null ||
      object[key] === undefined ||
      object[key] === "null"
    ) {
      delete object[key];
    }
  }
  return object;
};
