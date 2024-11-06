// 任务数据数据结构
export const schema = {
  // 任务ID
  id: "",
  // 任务名称
  taskName: "",
  // 任务状态
  taskStatus: "00",
  // 任务组
  taskGroup: false,
  // 任务优先级
  taskPriority: "06",
  // 父任务ID
  parentId: "",
  // 创建时间
  createTime: "",
  // 更新时间
  updateTime: "",
  // 子任务（taskGroup为true时，该字段有效）
  subTasks: [
    {
      // 子任务ID
      id: "",
      // 子任务名称
      taskName: "",
      // 子任务状态
      taskStatus: "00",
      // 子任务优先级
      taskPriority: "06",
      // 父任务ID
      parentId: "",
      // 创建时间
      createTime: "",
      // 更新时间
      updateTime: "",
    },
  ],
};
