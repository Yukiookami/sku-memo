// Description: 通用工具函数
import { v4 as uuidv4 } from "uuid";

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

/**
 * @description: 创建一个节流函数
 * @param {Function} func 需要节流的函数
 * @param {Number} wait 等待时间，单位为毫秒
 * @return {Function} 返回一个节流后的函数
 */
export const throttle = (func, wait) => {
  let timeout = null;
  let previous = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
};

/**
 * @description: 生成唯一uuid
 * @return {String} 返回一个uuid
 */
export const generateUUID = () => {
  return uuidv4();
};
