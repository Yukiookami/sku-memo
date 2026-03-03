<!-- 通知时间选择组件 -->
<!-- 功能：选择/清除任务的提醒时间，支持紧急模式（提前多少分钟再发一条通知） -->
<template>
  <!-- 触发按鈕 -->
  <div
    class="notify-trigger"
    :class="{ 'notify-actived': !!modelValue }"
    @click="handleOpen"
  >
    <i v-if="modelValue && urgentMinutes" class="icon-priority"></i>
    <span>{{ displayText }}</span>
    <i
      v-if="modelValue && repeatNotify"
      class="icon-todo notify-suffix-repeat"
    ></i>
    <!-- 清除按鈕 -->
    <i
      v-if="modelValue"
      class="icon-close notify-clear"
      @click.stop="handleClear"
    ></i>
  </div>

  <!-- 时间选择弹出框 -->
  <nut-popup
    v-model:visible="show"
    position="bottom"
    :style="{ width: '100%', paddingBottom: '70px' }"
  >
    <nut-date-picker
      v-model="pickerDate"
      title="选择提醒时间"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleConfirm"
      @cancel="show = false"
    >
      <!-- 底部：紧急模式设置 -->
      <template #default>
        <div class="urgent-sec">
          <!-- 紧急开关 -->
          <div class="urgent-row">
            <div class="urgent-label">
              <i class="icon-priority icon-color-black icon-size-11"></i>
              <span>紧急提醒</span>
            </div>
            <nut-switch v-model="urgentEnabled" />
          </div>

          <!-- 提前分钟选项 -->
          <transition name="fade">
            <div class="urgent-options" v-if="urgentEnabled">
              <span
                v-for="m in minuteOptions"
                :key="m"
                class="urgent-option"
                :class="{ 'urgent-option-selected': selectedMinutes === m }"
                @click.stop="selectedMinutes = m"
              >
                提前{{ m }}分钟
              </span>
            </div>
          </transition>

          <!-- 重复提醒开关 -->
          <div
            class="urgent-row repeat-row"
            :class="{ 'repeat-disabled': !urgentEnabled }"
          >
            <div class="urgent-label">
              <i class="icon-todo icon-color-black"></i>
              <span>每5分钟提醒</span>
            </div>
            <nut-switch v-model="repeatEnabled" :disabled="!urgentEnabled" />
          </div>
        </div>
      </template>
    </nut-date-picker>
  </nut-popup>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { formatNotifyTime } from "../../utils/notification";

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  urgentMinutes: {
    type: Number,
    default: null,
  },
  repeatNotify: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:urgentMinutes",
  "update:repeatNotify",
]);

const show = ref(false);
const pickerDate = ref(new Date());
const urgentEnabled = ref(false);
const repeatEnabled = ref(false);
const selectedMinutes = ref(5);
const minuteOptions = [5, 10, 15, 30, 60];

// 关闭紧急时自动关闭重复
watch(urgentEnabled, (val) => {
  if (!val) repeatEnabled.value = false;
});

const minDate = computed(() => new Date());
const maxDate = computed(() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d;
});

const displayText = computed(() => {
  if (props.modelValue) {
    return formatNotifyTime(props.modelValue);
  }
  return "提醒";
});

const handleOpen = () => {
  pickerDate.value = props.modelValue ? new Date(props.modelValue) : new Date();
  urgentEnabled.value = !!props.urgentMinutes;
  selectedMinutes.value = props.urgentMinutes ?? 5;
  repeatEnabled.value = !!props.repeatNotify;
  show.value = true;
};

const handleConfirm = ({ selectedValue }) => {
  const [year, month, day, hour, minute] = selectedValue;
  const date = new Date(year, month - 1, day, hour, minute, 0);
  emit("update:modelValue", date.getTime());
  emit(
    "update:urgentMinutes",
    urgentEnabled.value ? selectedMinutes.value : null,
  );
  emit("update:repeatNotify", repeatEnabled.value);
  show.value = false;
};

const handleClear = () => {
  emit("update:modelValue", null);
  emit("update:urgentMinutes", null);
  emit("update:repeatNotify", false);
};
</script>

<style lang="scss" scoped>
.notify-trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;
  margin-right: 12px;

  i {
    font-size: 14px;
    margin-right: 3px;
    transition: all 0.15s;
  }

  :deep(i::before),
  i::before {
    color: #000 !important;
  }

  span {
    display: block;
    font-size: 12px;
    font-weight: bolder;
    white-space: nowrap;
    color: #000;
  }

  &.notify-actived {
    color: $primary-color;
    span {
      color: $primary-color;
    }
    i::before {
      color: $primary-color !important;
    }
    :deep(i::before) {
      color: $primary-color !important;
    }
  }

  .notify-clear {
    margin-left: 4px;
    margin-right: 0;
    font-size: 12px;
    opacity: 0.6;
  }

  .notify-suffix-icon {
    margin-left: 2px;
    margin-right: 0;
    font-size: 14px;
  }

  .notify-suffix-repeat {
    margin-left: 2px;
    margin-right: 0;
    font-size: 14px;
  }
}

.urgent-sec {
  padding: 8px 16px 4px;
  border-top: 1px solid #f0f0f0;

  .icon-color-black {
    &::before {
      color: #000 !important;
    }
  }

  .icon-size-11 {
    &::before {
      font-size: 14px !important;
    }
  }

  .urgent-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;

    .urgent-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;

      i {
        font-size: 13px;
      }
    }
  }

  .urgent-options {
    display: flex;
    justify-content: space-between;
    padding: 4px 0 4px;

    .urgent-option {
      flex: 1;
      text-align: center;
      padding: 4px 0;
      border-radius: 12px;
      font-size: 11px;
      border: 1px solid #ddd;
      color: #666;
      cursor: pointer;
      transition: all 0.15s;
      margin: 0 3px;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }

      &.urgent-option-selected {
        border-color: $primary-color;
        color: $primary-color;
        background: rgba(64, 158, 255, 0.08);
      }
    }
  }

  .repeat-row {
    margin-top: 2px;
    border-top: 1px solid #f5f5f5;
  }

  .repeat-disabled {
    opacity: 0.35;
    pointer-events: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
  max-height: 200px;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
