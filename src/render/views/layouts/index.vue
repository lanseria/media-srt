<template>
  <n-layout position="absolute">
    <n-layout-header class="nav" bordered>
      <n-text tag="div" class="ui-logo" :depth="1" @click="goHome()">
        <img src="@render/assets/logo.png" />
        <span>Media Srt Tools</span>
      </n-text>

      <div></div>
      <div class="nav-end">
        <dark-mode-toggle class="nav-picker"></dark-mode-toggle>
      </div>
    </n-layout-header>
    <router-view></router-view>
  </n-layout>
</template>
<script lang="ts" setup>
import DarkModeToggle from "@render/components/common/DarkModeToggle.vue";
import { useImpRoute } from "@render/hooks/useRoute";
import { NLayout, NLayoutHeader, NText } from "naive-ui";
const { pushPath } = useImpRoute();
const goHome = () => {
  pushPath("/");
};
</script>
<style lang="css" scoped>
.nav {
  --side-padding: 32px;
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
  grid-template-columns: calc(272px - var(--side-padding)) 1fr auto;
}
.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
}
.ui-logo > img {
  margin-right: 12px;
  height: 32px;
  width: 32px;
}
.nav-end {
  display: flex;
  align-items: center;
}
</style>
