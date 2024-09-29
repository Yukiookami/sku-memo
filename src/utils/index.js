/*
 * @Author: zxy
 * @Date: 2024-09-19 22:20:08
 * @LastEditTime: 2024-09-29 15:33:03
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
    if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
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

/**
 * @description: 将枚举对象转换为数组
 * @param {*} enumObj 枚举对象
 * @return {Array} 返回一个数组，包含枚举对象的键值对
 */
export const convertEnumToArray = (enumObj) => {
  const result = [];
  const processedKeys = new Set(); // 用于跟踪已经处理过的键

  for (const key in enumObj) {
    if (!Object.prototype.hasOwnProperty.call(enumObj, key)) continue;

    const value = enumObj[key];

    // 检查键是否已经处理过，避免重复
    if (processedKeys.has(key)) continue;

    result.push({ key, value });
    processedKeys.add(key); // 标记键为已处理
    processedKeys.add(value); // 标记值为已处理，避免处理反向映射
  }

  return result;
};
