<template>
  <n-button text @click="handleThemeUpdate">
    {{ themeText }}
  </n-button>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { NButton } from "naive-ui";
import { useAppStore } from "@render/store/modules/app";
// use
const appStore = useAppStore();
// computed
const themeText = computed(() => {
  return appStore.getThemeText;
});
// method
const handleThemeUpdate = () => {
  appStore.triggerTheme();
};
</script>
