import skuIndexDb from "../../utils/indexedDB";

const STORE_NAME = "task";

// 任务追加
const httpTaskAdd = async (param) => {
  return skuIndexDb.addData(param, STORE_NAME);
};

// 任务修改
const httpTaskChange = async (id, param) => {
  return skuIndexDb.updateData(id, param, STORE_NAME);
};

// 任务获取
const httpTaskGet = async (id) => {
  return skuIndexDb.getData(id, STORE_NAME);
};

// 任务删除
const httpTaskDelete = async (id) => {
  return skuIndexDb.deleteData(id, STORE_NAME);
};

// 任务列表获取
const httpTaskGetAll = async () => {
  return skuIndexDb.getAllData(STORE_NAME);
};

// 任务批量删除
const httpTaskDeleteAll = async (ids) => {
  return skuIndexDb.deleteDataList(ids, STORE_NAME);
};

export {
  httpTaskAdd,
  httpTaskChange,
  httpTaskGet,
  httpTaskDelete,
  httpTaskGetAll,
  httpTaskDeleteAll,
};
