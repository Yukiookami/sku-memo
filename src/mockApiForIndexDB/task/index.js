/*
 * @Author: zxy
 * @Date: 2024-09-19 21:49:07
 * @LastEditTime: 2024-09-24 12:00:34
 * @FilePath: \SkuMemo\src\mockApiForIndexDB\task\index.js
 */
import skuIndexDb from "../../utils/indexedDB";

const STORE_NAME_LIFE = "taskForLife";
const STORE_NAME_WORK = "taskForWork";

// 任务追加
const httpTaskAdd = async (param, storeName) => {
  return skuIndexDb.addData(param, storeName);
};

// 任务修改
const httpTaskChange = async (id, param, storeName) => {
  return skuIndexDb.updateData(id, param, storeName);
};

// 任务批量修改
const httpTaskChangeAll = async (paramList, storeName) => {
  return skuIndexDb.updateDataList(paramList, storeName);
};

// 任务获取
const httpTaskGet = async (id, storeName) => {
  return skuIndexDb.getData(id, storeName);
};

// 任务删除
const httpTaskDelete = async (id, storeName) => {
  return skuIndexDb.deleteData(id, storeName);
};

// 任务列表获取
const httpTaskGetAll = async (storeName) => {
  return skuIndexDb.getAllData(storeName);
};

// 任务批量删除
const httpTaskDeleteAll = async (ids, storeName) => {
  return skuIndexDb.deleteDataList(ids, storeName);
};

export {
  // 常量导出
  STORE_NAME_LIFE,
  STORE_NAME_WORK,
  // 通用任务方法
  httpTaskAdd,
  httpTaskChange,
  httpTaskGet,
  httpTaskDelete,
  httpTaskGetAll,
  httpTaskDeleteAll,
  httpTaskChangeAll,
};
