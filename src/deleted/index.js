import { isEmpty, isObject, properObject } from '../utils';

const deletedDiff = (lhs, rhs) => {
  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  const l = properObject(lhs);
  const r = properObject(rhs);

  return Object.keys(l).reduce((acc, key) => {
    if (r.hasOwnProperty(key)) {
      const difference = deletedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    }
    if (typeof l[key] === "object" && r[key] === undefined) {
      const difference = deletedDiff(l[key], {});
      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    }

    return { ...acc, [key]: { before: l[key] ,after: undefined } };
  }, {});
};

export default deletedDiff;
