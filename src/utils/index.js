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
 * @description: 检查对象是否包含指定数组中的所有属性
 * @param {Array} keys 想要检查的属性数组
 * @param {Object} obj 检查的对象
 * @return {Boolean} 如果对象包含所有属性则返回 true，否则返回 false
 */
export const checkHasAllProperties = (keys, obj) => {
  return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
};
