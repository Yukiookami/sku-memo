/*
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-20 19:04:10
 * @FilePath: \MakeMemo\src\assets\data\status.js
 */
// Desc: 状态数据
import { createEnum } from "../../utils/index";

// SkuHeader组件使用
// 头部标题
export const HeaderTitle = "SkuTodo";
// SkuHeader组件使用 end

// SkuText组件使用
// 支持的Tpye类型
export const TextType = createEnum({
  // 文本
  text: "文本",
  // 标题1号
  h1: "标题1号",
  // 标题2号
  h2: "标题2号",
  // 标题3号
  h3: "标题3号",
  // 标题4号
  h4: "标题4号",
  // 标题5号
  h5: "标题5号",
  // 标题6号
  h6: "标题6号",
});

// 支持的特殊字体
export const TextFont = createEnum({
  // 默认
  chineseFont: "默认",
  // header标题字体
  headerTitleFont: "header标题字体",
});
// SkuText组件使用 end

// SkuTask组件使用
// 任务状态
export const TaskStatus = createEnum({
  // 未完成
  "00": "未完成",
  // 已完成
  "01": "已完成",
  // 已删除
  "02": "已删除",
});
