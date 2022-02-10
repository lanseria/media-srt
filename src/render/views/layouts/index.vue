<template>
  <n-layout>
    <n-layout-header>颐和园路</n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <router-view></router-view>
    </n-layout-content>
    <n-layout-footer>成府路</n-layout-footer>
  </n-layout>
  <router-view />
</template>
<script lang="ts" setup>
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
} from "naive-ui";
</script>
