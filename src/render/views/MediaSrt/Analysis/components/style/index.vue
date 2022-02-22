<template>
  <n-form :model="model" ref="formRef">
    <n-form-item path="defaultStyle" label="默认样式">
      <n-tag checkable v-model:checked="model.checked">黑底字幕</n-tag>
    </n-form-item>
    <n-form-item label="高级设置">
      <n-tag checkable v-model:checked="model.checked">黑底字幕</n-tag>
    </n-form-item>
  </n-form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { NForm, NFormItem, NTag } from "naive-ui";
const model = ref({
  checked: false,
});
</script>
