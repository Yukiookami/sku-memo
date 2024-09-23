<template>
  <div>home画面</div>
  <button @click="addData">添加数据123</button>
  <button @click="changeData">修改数据456</button>
  <button @click="removeData">删除数据</button>
  <button @click="findData">查询数据</button>
  <span>{{ state.count }}</span>
</template>

<script setup>
import { reactive } from "vue";
import {
  httpTestAdd,
  httpTestChange,
  httpTestGet,
  httpTestDelete,
} from "../mockApiForIndexDB/test";

const state = reactive({
  count: 0,
  countId: 0,
});

const addData = async () => {
  const res = await httpTestAdd({
    count: 123,
  });
  state.count = res.data.count;
  state.countId = res.data.id;
  console.log(res);
};

const changeData = async () => {
  const res = await httpTestChange(state.countId, {
    count: 456,
  });
  state.count = 456;
  console.log(res);
};

const removeData = async () => {
  const res = await httpTestDelete(state.countId);
  state.count = 0;
  console.log(res);
};

const findData = async () => {
  const res = await httpTestGet();
  console.log(res);
};
</script>

<style lang="scss" scoped></style>
