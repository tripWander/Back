export const copyObject = <T>(object: T): T => {
  const stringCopy = JSON.stringify(object);
  return JSON.parse(stringCopy);
};

export const identity = <T>(value: T): T => value;
