/*
 * @Author: zxy
 * @Date: 2024-09-19 22:20:08
 * @LastEditTime: 2024-09-20 21:08:41
 * @FilePath: \MakeMemo\src\utils\index.js
 */

/**
 * @description: 创建枚举对象
 * @param {*} enumObj 枚举对象
 * @return {*}
 */
export const createEnum = (enumObj) => {
  const enumMap = {};
  for (const key in enumObj) {
    if (enumObj.hasOwnProperty(key)) {
      const value = enumObj[key];
      enumMap[key] = value;
      enumMap[value] = key;
    }
  }
  return Object.freeze(enumMap);
};

/**
 * @description: 检查对象是否有某个属性
 * @param {*} checkKey 想要检查的属性
 * @param {*} obj 检查的对象
 * @return {*}
 */
export const checkHasOwnProperty = (checkKey, obj) => {
  return Object.prototype.hasOwnProperty.call(obj, checkKey);
};
