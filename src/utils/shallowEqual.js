// from http://github.com/stripe/react-stripe-elements/blob/master/src/utils/shallowEqual.js
// @flow

const shallowEqual = (a: Object, b: Object): boolean => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  return (
    keysA.length === keysB.length &&
    keysA.every((key) => b.hasOwnProperty(key) && b[key] === a[key])
  );
};

export default shallowEqual;