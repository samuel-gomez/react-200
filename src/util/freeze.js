export function freeze(thing) {
  if (typeof thing === 'object') {
    Object.freeze(thing);
    Object.keys(thing).forEach(prop => freeze(thing[prop]));
  }
  return thing;
}