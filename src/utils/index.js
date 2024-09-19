/*
 * @Author: zxy
 * @Date: 2024-09-19 22:20:08
 * @LastEditTime: 2024-09-19 22:29:28
 * @FilePath: \SkuMemo\src\utils\index.js
 */

/**
 * @description: 创建枚举对象
 * @param {*} enumObj
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
