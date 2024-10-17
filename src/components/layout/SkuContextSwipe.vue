<!-- 左右滑动面板组件 -->
<!--
  影响范围；
  src\views\SkuMemoHome.vue
-->
<template>
  <div
    class="sku-context-swipe"
    ref="swipeContainer"
    @touchstart="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mousemove.passive="onTouchMove"
    @mouseup="onTouchEnd"
    v-long-press="{ duration: longPressTime, onLongPress, onLongPressEnd }"
  >
    <!-- 左侧内容 -->
    <div class="context-swipe-left-context">
      <slot name="left"></slot>
    </div>
    <!-- 右侧内容 -->
    <div class="context-swipe-right-context">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "../../stores";

// 使用 store
const store = useStore();

// 获取滑动容器
const swipeContainer = ref(null);
// 当前触摸点的 x 坐标
let currentX = 0;
// 触摸起始点的 x 坐标
let startX = 0;
// 是否正在滑动
let isSwiping = false;
// 是否发生了滑动
let hasSwiped = false;
// 当前显示的内容区块，初始为 left，可选值为 left 和 right
let currentView = "left";
// 滑动起始阈值，只有滑动超过此距离才开始移动容器
const startThreshold = 20; // 可以根据需要调整此值
// 长按定时器
let longPressTimer = null;
// 是否允许滑动
let allowSwipe = false;
// 长按时间
const longPressTime = 300; // 可以根据需要调整此值

const onLongPress = () => {
  allowSwipe = true;
  store.setIsTouchForContextMove(true); // 设置 store 中的是否内容滑动状态为 true
};

const onLongPressEnd = () => {
  allowSwipe = false;
  store.setIsTouchForContextMove(false); // 设置 store 中的是否内容滑动状态为 true
};

/**
 * 设置滑动到左侧
 */
const setSwipeToLeft = () => {
  swipeContainer.value.style.transform = "translateX(0)";
  currentView = "left";
};

/**
 * 设置滑动到右侧
 */
const setSwipeToRight = () => {
  swipeContainer.value.style.transform = "translateX(-100vw)";
  currentView = "right";
};

/**
 * 开始滑动
 * @param event {TouchEvent | MouseEvent}
 */
const onTouchStart = (event) => {
  // 获取触摸点或鼠标的 x 坐标
  startX = event.touches ? event.touches[0].clientX : event.clientX;
  isSwiping = true;
  hasSwiped = false; // 重置滑动标志
  allowSwipe = false; // 重置允许滑动标志
};

/**
 * 滑动中
 * @param event {TouchEvent | MouseEvent}
 */
const onTouchMove = (event) => {
  if (!isSwiping) return;
  currentX = event.touches ? event.touches[0].clientX : event.clientX;
  const deltaX = currentX - startX;

  // 如果滑动距离小于起始阈值，不进行任何处理
  if (Math.abs(deltaX) < startThreshold) {
    return;
  }

  hasSwiped = true; // 标记为已滑动

  // 如果允许滑动，则处理滑动事件
  if (allowSwipe) {
    // 定义策略对象
    const swipeStrategies = {
      left: (deltaX) => {
        if (deltaX < 0) {
          swipeContainer.value.style.transform = `translateX(${deltaX}px)`;
        }
      },
      right: (deltaX) => {
        if (deltaX > 0) {
          swipeContainer.value.style.transform = `translateX(${
            deltaX - window.innerWidth
          }px)`;
        }
      },
    };

    // 使用策略模式处理滑动
    swipeStrategies[currentView](deltaX);
  }
};

/**
 * 滑动结束
 */
const onTouchEnd = () => {
  clearTimeout(longPressTimer); // 清除长按定时器
  // 如果不允许滑动，则不进行任何处理
  if (!allowSwipe) {
    return;
  }
  store.setIsTouchForContextMove(false); // 设置 store 中的是否内容滑动状态为 false
  if (!isSwiping || !hasSwiped) {
    isSwiping = false;
    return; // 只有在滑动后才处理
  }
  isSwiping = false;
  const deltaX = currentX - startX;

  // 滑动完成阈值，滑动超过此距离则切换视图
  const threshold = window.innerWidth / 8; // 将阈值调整为屏幕宽度的1/8，减少切换所需的滑动距离

  // 判断滑动方向和当前显示的内容
  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0 && currentView === "right") {
      // 向右滑动且当前显示的是 right，则切换到 left
      setSwipeToLeft();
      // 切换到左侧时，设置 store 中的当前分类为 0
      store.setActiveIndexInFooter(0);
    } else if (deltaX < 0 && currentView === "left") {
      // 向左滑动且当前显示的是 left，则切换到 right
      setSwipeToRight();
      // 切换到右侧时，设置 store 中的当前分类为 1
      store.setActiveIndexInFooter(1);
    } else {
      // 已经是 left 或 right，并且继续向边界滑动，不做处理
      swipeContainer.value.style.transform =
        currentView === "left" ? "translateX(0)" : "translateX(-100vw)";
    }
  } else {
    // 滑动距离不足，回到原位
    swipeContainer.value.style.transform =
      currentView === "left" ? "translateX(0)" : "translateX(-100vw)";
  }
};

// 监听底部分类的变化，切换内容区块
watch(
  () => store.activeIndexInFooter,
  (newIndex) => {
    if (newIndex === 0) {
      setSwipeToLeft();
    } else {
      setSwipeToRight();
    }
  }
);
</script>

<style lang="scss" scoped>
.sku-context-swipe {
  display: flex;
  width: 200vw;
  height: calc(var(--vh, 1vh) * 100 - #{$header-height} - #{$footer-height});
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform 0.2s ease; // 可以适当增加过渡时间，提升滑动体验
  // -webkit-overflow-scrolling: touch; // ios 滚动流畅
}

.context-swipe-left-context,
.context-swipe-right-context {
  width: 100%;
  padding: 20px 10px;
  height: 100%;
  overflow: auto;
}
</style>
