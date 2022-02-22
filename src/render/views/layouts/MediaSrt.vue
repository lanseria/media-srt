<template>
  <n-layout
    has-sider
    position="absolute"
    :style="{
      top: 'var(--header-height)',
    }"
  >
    <n-layout-sider
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
      bordered
      show-trigger="bar"
      trigger-style="top: calc(50% - var(--header-height));"
      :collapsed="collapsed"
    >
      <n-menu
        :value="activeKey"
        @update:value="handleUpdateValue"
        :options="options"
      />
    </n-layout-sider>
    <n-layout
      ref="layoutInstRef"
      :native-scrollbar="false"
      position="static"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <div class="content">
        <router-view />
      </div>
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import { h, computed } from "vue";
import { NLayout, NLayoutSider, NMenu, NIcon } from "naive-ui";
import { mediaSrtRoute } from "../MediaSrt/route";
import { useImpRoute } from "@render/hooks/useRoute";
import { useAppStore } from "@render/store/modules/app";
/**
 * <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
 */
function renderIcon(icon: string) {
  return () =>
    h(NIcon, null, {
      default: () =>
        h("svg", { class: "icon", "aria-hidden": true }, [
          h("use", { "xlink:href": `#${icon}` }),
        ]),
    });
}
// use
const appStore = useAppStore();
const { pushName, crtName } = useImpRoute();
// ref
const activeKey = computed(() => {
  return crtName.value;
});
// computed
const collapsed = computed(() => {
  return appStore.collapsed;
});
// method
const handleUpdateValue = (key: string) => {
  pushName(key);
};
const options = mediaSrtRoute
  .filter((m) => !m.meta.hidden)
  .map((m) => {
    return {
      label: m.meta.title,
      key: m.name,
      icon: renderIcon(m.meta.icon as string),
    };
  });
</script>
<style lang="css">
.content {
  padding: 20px;
}
</style>
