import { throttle } from "../utils";

export default {
  mounted(el, binding) {
    let pressTimer = null;
    let isLongPressTriggered = false; // 用于记录长按是否已经触发
    let hasMoved = false; // 用于标记手指/鼠标是否移动
    // 获取传递的长按时间，默认为 1000 毫秒（1 秒）
    const longPressDuration = binding.value.duration || 1000;

    // 创建计时器
    const start = (event) => {
      if (event.type === "click" && event.button !== 0) {
        return; // 如果是鼠标事件，且不是左键，则不处理
      }

      // 重置移动标志
      hasMoved = false;

      // 如果已有计时器，先清除它
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
      }

      isLongPressTriggered = false; // 每次开始按下时重置标志

      pressTimer = setTimeout(() => {
        if (!hasMoved) {
          isLongPressTriggered = true; // 标记为已触发长按
          if (typeof binding.value.onLongPress === "function") {
            binding.value.onLongPress(); // 执行绑定的回调函数, 用于长按后的操作
          }
        }
      }, longPressDuration);
    };

    // 清除计时器
    const throttledCancel = throttle(() => {
      // 如果长按已经触发，阻止短按的后续执行
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;

        if (
          !isLongPressTriggered &&
          typeof binding.value.onLongPressEnd === "function"
        ) {
          binding.value.onLongPressEnd(); // 执行绑定的回调函数, 用于取消长按后的操作
        }
      }
    }, 500);

    const moveHandler = () => {
      hasMoved = true; // 标记手指/鼠标移动
    };

    const cancel = () => {
      throttledCancel(); // 调用节流后的 cancel 函数
    };

    // 添加事件监听
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    el.addEventListener("mousemove", moveHandler); // 监听移动事件
    el.addEventListener("touchmove", moveHandler); // 监听触摸移动事件
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);

    // 在卸载时移除监听
    el._cancel = cancel;
  },
  unmounted(el) {
    el.removeEventListener("mousedown", el._cancel);
    el.removeEventListener("touchstart", el._cancel);
    el.removeEventListener("mousemove", el._cancel);
    el.removeEventListener("touchmove", el._cancel);
    el.removeEventListener("mouseup", el._cancel);
    el.removeEventListener("mouseleave", el._cancel);
    el.removeEventListener("touchend", el._cancel);
    el.removeEventListener("touchcancel", el._cancel);
  },
};
