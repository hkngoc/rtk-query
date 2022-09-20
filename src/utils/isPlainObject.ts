export const isPlainObject = (value: any) => {
  if (typeof value !== 'object' || value === null) return false;

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}

export default isPlainObject;
