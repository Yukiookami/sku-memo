// 本地通知工具函数
import { LocalNotifications } from "@capacitor/local-notifications";

/**
 * 请求通知权限
 * @returns {Promise<boolean>} 是否获得权限
 */
export const requestNotificationPermission = async () => {
  const { display } = await LocalNotifications.requestPermissions();
  return display === "granted";
};

/**
 * 检查通知权限
 * @returns {Promise<boolean>} 是否有权限
 */
export const checkNotificationPermission = async () => {
  const { display } = await LocalNotifications.checkPermissions();
  return display === "granted";
};

/**
 * 根据任务 id 生成唯一的通知 id（取 hash，限制在 int32 范围内）
 * @param {string|number} taskId
 * @returns {number}
 */
const generateNotificationId = (taskId) => {
  const str = String(taskId);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

/**
 * 为任务设置本地通知
 * @param {Object} task 任务对象
 * @param {string|number} task.id 任务 id
 * @param {string} task.taskName 任务名称
 * @param {number} task.notifyTime 提醒时间戳（毫秒）
 * @param {number|null} task.urgentMinutes 紧急提前分钟数，null 表示不开启
 */
export const scheduleTaskNotification = async (task) => {
  if (!task.notifyTime) return;

  const notifyDate = new Date(task.notifyTime);
  const now = new Date();
  // 如果时间已过，不设置通知
  if (notifyDate <= now) return;

  const hasPermission = await checkNotificationPermission();
  if (!hasPermission) {
    const granted = await requestNotificationPermission();
    if (!granted) return;
  }

  const notificationId = generateNotificationId(task.id ?? task.taskId);
  const notifications = [
    {
      id: notificationId,
      title: "SkuTodo 提醒",
      body: task.taskName,
      schedule: { at: notifyDate },
      sound: "default",
      smallIcon: "ic_launcher",
      actionTypeId: "",
      extra: { taskId: String(task.id ?? task.taskId) },
    },
  ];

  // 紧急模式：额外发一条提前 urgentMinutes 分钟的通知
  if (task.urgentMinutes) {
    const urgentDate = new Date(
      task.notifyTime - task.urgentMinutes * 60 * 1000,
    );
    if (urgentDate > now) {
      notifications.push({
        id: notificationId + 1,
        title: "SkuTodo 紧急提醒",
        body: `${task.taskName}（${task.urgentMinutes}分钟后到期）`,
        schedule: { at: urgentDate },
        sound: "default",
        smallIcon: "ic_launcher",
        actionTypeId: "",
        extra: { taskId: String(task.id ?? task.taskId) },
      });
    }
  }

  // 每5分钟重复提醒：从 now+5min 开始，每5分钟一条，到 notifyDate-5min 结束（首尾不触发）
  if (task.repeatNotify) {
    const INTERVAL_MS = 5 * 60 * 1000;
    const MAX_COUNT = 60;
    let repeatIndex = 0;
    // 第一条：当前时间 + 5分钟
    let t = now.getTime() + INTERVAL_MS;
    // 最后一条不超过 notifyDate - 5分钟（不包含最后5分钟）
    const repeatEnd = notifyDate.getTime() - INTERVAL_MS;
    while (t <= repeatEnd && repeatIndex < MAX_COUNT) {
      notifications.push({
        id: notificationId + 2 + repeatIndex,
        title: "SkuTodo 重复提醒",
        body: task.taskName,
        schedule: { at: new Date(t) },
        sound: "default",
        smallIcon: "ic_launcher",
        actionTypeId: "",
        extra: { taskId: String(task.id ?? task.taskId) },
      });
      t += INTERVAL_MS;
      repeatIndex++;
    }
  }

  await LocalNotifications.schedule({ notifications });
};

/**
 * 取消任务的本地通知（包含紧急提醒和重复提醒）
 * @param {string|number} taskId 任务 id
 */
export const cancelTaskNotification = async (taskId) => {
  const notificationId = generateNotificationId(taskId);
  // 取消主通知、紧急通知（+1）和最多 60 条重复通知（+2 ~ +61）
  const ids = [
    { id: notificationId },
    { id: notificationId + 1 },
    ...Array.from({ length: 60 }, (_, i) => ({ id: notificationId + 2 + i })),
  ];
  await LocalNotifications.cancel({ notifications: ids });
};

/**
 * 格式化时间戳为显示字符串
 * @param {number} timestamp 毫秒时间戳
 * @returns {string} 格式化后的时间字符串
 */
export const formatNotifyTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
