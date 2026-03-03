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
  // 提醒时间（时间戳毫秒，null 表示不提醒）
  notifyTime: null,
  // 紧急提前分钟数（null 表示不开启紧急模式）
  urgentMinutes: null,
  // 是否每5分钟重复提醒（直到主提醒时间）
  repeatNotify: false,
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
      // 提醒时间（时间戳毫秒，null 表示不提醒）
      notifyTime: null,
      // 紧急提前分钟数（null 表示不开启紧急模式）
      urgentMinutes: null,
      // 是否每5分钟重复提醒
      repeatNotify: false,
    },
  ],
};
