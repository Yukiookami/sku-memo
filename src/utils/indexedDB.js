import { openDB } from "idb";

// IndexedDB设置
const DB_NAME = "SkuMemoDB";
const DB_VERSION = 1;

// 初始化IndexedDB
const initDB = async (storeName) => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 创建对象存储空间，设置主键为id，自增
      db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });
  return db;
};

// 添加数据
const addData = async (data, storeName) => {
  let code = 200;
  let msg = "success";

  const db = await initDB(storeName);
  // 开启事务，添加数据
  const tx = db.transaction(storeName, "readwrite");
  // 获取对象存储空间
  const store = tx.objectStore(storeName);
  // 添加数据 返回id
  const id = await store.add(data);
  // 等待事务完成
  await tx.done;

  return {
    code,
    msg,
    data: {
      ...data,
      id,
    },
  };
};

// 获取数据
const getData = async (id, storeName) => {
  if (!id) {
    return await getAllData(storeName);
  } else {
    let code = 200;
    let msg = "success";

    const db = await initDB(storeName);
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const data = await store.get(id);
    await tx.done;
    return {
      code,
      msg,
      data,
    };
  }
};

// 获取所有数据
const getAllData = async (storeName) => {
  console.log("getAllData");
  let code = 200;
  let msg = "success";

  const db = await initDB(storeName);
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const allData = await store.getAll();
  await tx.done;

  console.log(allData);
  return {
    code,
    msg,
    data: allData,
  };
};

// 删除数据
const deleteData = async (id, storeName) => {
  let code = 200;
  let msg = "success";

  const db = await initDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;

  return {
    code,
    msg,
  };
};

// 删除所有数据
const clearData = async (storeName) => {
  let code = 200;
  let msg = "success";

  const db = await initDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.clear();
  await tx.done;

  return {
    code,
    msg,
  };
};

// 修改数据
const updateData = async (id, updatedData, storeName) => {
  let code = 200;
  let msg = "success";
  let dataForRes = {
    code,
    msg,
  };

  const db = await initDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  // 获取现有的数据
  const data = await store.get(id);

  if (data) {
    // 更新数据
    const updatedRecord = { ...data, ...updatedData };
    let id = await store.put(updatedRecord);
    dataForRes = {
      ...updatedRecord,
      id,
    };
  } else {
    dataForRes = {
      code: 404,
      msg: `ID 为 ${id} 的数据不存在`,
    };
  }

  await tx.done;

  return {
    code,
    msg,
    data: dataForRes,
  };
};

const skuIndexDb = {
  addData,
  getData,
  getAllData,
  deleteData,
  updateData,
  clearData,
};

export default skuIndexDb;
