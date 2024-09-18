import skuIndexDb from "../../utils/indexedDB";

const STORE_NAME = "test";

// 添加数据
const httpTestAdd = async (param) => {
  return skuIndexDb.addData(
    {
      ...param,
    },
    STORE_NAME
  );
};

// 修改数据
const httpTestChange = async (id, param) => {
  return skuIndexDb.updateData(id, param, STORE_NAME);
};

// 获得数据
const httpTestGet = async (id) => {
  return skuIndexDb.getData(id, STORE_NAME);
};

// 删除数据
const httpTestDelete = async (id) => {
  return skuIndexDb.deleteData(id, STORE_NAME);
};

export { httpTestAdd, httpTestChange, httpTestGet, httpTestDelete };
