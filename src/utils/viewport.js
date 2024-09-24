/*
 * @Author: zxy
 * @Date: 2024-09-25 00:07:34
 * @LastEditTime: 2024-09-25 00:11:00
 * @FilePath: \MakeMemo\src\utils\viewport.js
 */
// viewport.js
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// 初始设置
setViewportHeight();

// 监听窗口大小变化
window.addEventListener("resize", setViewportHeight);

// 禁用双指缩放手势
document.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);
