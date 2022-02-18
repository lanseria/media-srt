import { intersection, keys, pick } from "lodash-es";

/**
 * 覆盖对象属性
 * @param distObject 初始化对象
 * @param srcObject 传递过来新对象
 */
export function mergeProperties<T>(distObject: T, srcObject: IObj) {
  const distPropList = keys(distObject);
  const srcPropList = keys(srcObject);
  const propList = intersection(distPropList, srcPropList);
  return {
    ...distObject,
    ...pick(srcObject, propList),
  };
}

export const serialize = (value) => {
  if (typeof value === "function") {
    return value.toString();
  }
  if (typeof value === "object") {
    var serializeObject = {};
    for (const [objectKey, objectValue] of Object.entries(value)) {
      serializeObject[objectKey] = serialize(objectValue);
    }
    return serializeObject;
  }

  return value;
};

export function deserialize(valueNew) {
  if (valueNew.toLowerCase().startsWith("function(")) {
    return Function('"use strict";return ' + valueNew);
  }
  if (typeof valueNew === "object") {
    var deserializeObject = {};
    for (const [objectKey, objectValue] of Object.entries(valueNew)) {
      deserializeObject[objectKey] = deserialize(objectValue);
    }
    return deserializeObject;
  }

  return valueNew;
}
