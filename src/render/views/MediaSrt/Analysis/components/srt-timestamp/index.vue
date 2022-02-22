<template>
  <div class="srt-timestamp">
    <span style="margin-right: 5px">{{ time }}</span>
    <n-button text style="font-size: 12px">
      <n-icon>
        <chevron-up-outline-icon />
      </n-icon>
    </n-button>
    <n-button text style="font-size: 12px">
      <n-icon>
        <chevron-down-outline-icon />
      </n-icon>
    </n-button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { NButton, NIcon } from "naive-ui";
import { useVModel } from "@vueuse/core";
import {
  ChevronUpOutline as ChevronUpOutlineIcon,
  ChevronDownOutline as ChevronDownOutlineIcon,
} from "@vicons/ionicons5";

const props = defineProps({
  timestamp: {
    type: Number,
  },
});
const emit = defineEmits(["update:timestamp"]);
const value = useVModel(props, "timestamp", emit);
const time = computed(() => {
  if (value.value) {
    return srtTimestamp(value.value);
  } else {
    return 0;
  }
});
//字幕时间戳转换
const srtTimestamp = (seconds: number) => {
  let $milliseconds = seconds + 0;

  let $seconds = Math.floor($milliseconds / 1000);
  let $minutes = Math.floor($seconds / 60);
  const $hours = Math.floor($minutes / 60);
  $milliseconds = $milliseconds % 1000;
  $seconds = $seconds % 60;
  $minutes = $minutes % 60;
  return (
    ($hours < 10 ? "0" : "") +
    $hours +
    ":" +
    ($minutes < 10 ? "0" : "") +
    $minutes +
    ":" +
    ($seconds < 10 ? "0" : "") +
    $seconds +
    "," +
    ($milliseconds < 100 ? "0" : "") +
    ($milliseconds < 10 ? "0" : "") +
    $milliseconds
  );
};
</script>
<style lang="css" scoped>
.srt-timestamp {
  display: flex;
}
</style>
