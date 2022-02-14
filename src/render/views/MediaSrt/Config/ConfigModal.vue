<template>
  <imp-modal ref="ImpModalRef" title="添加配置">
    <n-form :model="modelRef" ref="formRef">
      <n-form-item path="TENCENT_SECRET_ID" label="TENCENT_SECRET_ID">
        <n-input v-model:value="modelRef.TENCENT_SECRET_ID" />
      </n-form-item>
      <n-form-item path="TENCENT_SECRET_KEY" label="TENCENT_SECRET_KEY">
        <n-input v-model:value="modelRef.TENCENT_SECRET_KEY" />
      </n-form-item>
      <n-form-item path="TENCENT_COS_BUCKET" label="TENCENT_COS_BUCKET">
        <n-input v-model:value="modelRef.TENCENT_COS_BUCKET" />
      </n-form-item>
      <n-form-item path="TENCENT_COS_REGION" label="TENCENT_COS_REGION">
        <n-input v-model:value="modelRef.TENCENT_COS_REGION" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-space>
        <n-button type="primary" @click="handleSubmit()">保存</n-button>
        <n-button @click="close()">返回</n-button>
      </n-space>
    </template>
  </imp-modal>
</template>
<script lang="ts" setup>
import ImpModal from "@render/components/global/ImpModal.vue";
import { ref } from "vue";
import { NForm, NFormItem, NInput, NSpace, NButton } from "naive-ui";
import { ConfigForm } from "./Config.data";
import { db } from "@render/db";
import { serialize } from "@common/utils";
import dayjs from "dayjs";

const emit = defineEmits(["load-page"]);

// refs
const ImpModalRef = ref();
// ref
const modelRef = ref(new ConfigForm());
// methods
const open = (row?: ConfigForm) => {
  if (row) {
    modelRef.value.mergeProperties(row);
  } else {
    modelRef.value = new ConfigForm();
  }
  ImpModalRef.value.showModal = true;
};
const handleSubmit = () => {
  modelRef.value.updatedAt = +dayjs();
  const form = serialize(modelRef.value);
  db.configs.add(form);
  ImpModalRef.value.showModal = false;
};
const close = () => {
  modelRef.value = new ConfigForm();
  ImpModalRef.value.showModal = false;
  emit("load-page");
};
defineExpose({
  open,
});
</script>
