<template>
  <n-tabs type="segment">
    <n-tab-pane name="chap1" tab="字幕编辑" display-directive="show:lazy">
      <edit-tab-pane></edit-tab-pane>
    </n-tab-pane>
    <n-tab-pane name="chap2" tab="字幕样式" display-directive="show:lazy">
      <style-tab-pane></style-tab-pane>
    </n-tab-pane>
    <n-tab-pane
      name="chap3"
      tab="字幕与视频合并命令"
      display-directive="show:lazy"
    >
      <code-tab-pane></code-tab-pane>
    </n-tab-pane>
  </n-tabs>
</template>
<script lang="ts" setup>
import { NTabs, NTabPane } from "naive-ui";
import EditTabPane from "../edit/index.vue";
import StyleTabPane from "../style/index.vue";
import CodeTabPane from "../code/index.vue";
</script>
