<template>
  <imp-page-container :isBack="true">
    <div style="padding: 25px">
      <n-steps :current="current" :status="currentStatus">
        <n-step title="上传文件" description="上传需转写的视频文件" />
        <n-step title="等待翻译" description="等待AI翻译处理" />
        <n-step title="校对结果" description="对结果进行校对调整" />
        <n-step title="导出字幕" description="导出字幕/视频文件" />
      </n-steps>
      <n-divider />
      <n-form
        :model="model"
        ref="formRef"
        label-placement="left"
        :label-width="160"
        :style="{
          maxWidth: '640px',
          margin: '0 auto',
        }"
      >
        <n-form-item label="项目名称：" path="name">
          <n-input placeholder="请输入项目名称" v-model:value="model.name" />
        </n-form-item>
        <n-form-item label="上传文件：" path="objectName">
          <transfy-upload-video
            v-model:objectName="model.objectName"
          ></transfy-upload-video>
        </n-form-item>
        <n-form-item label="语言引擎模型：" path="engineModel">
          <n-select
            v-model:value="model.engineModel"
            :options="engineModelOpts"
            placeholder="请输入视频源语言"
          />
        </n-form-item>
      </n-form>
    </div>
  </imp-page-container>
</template>
<script lang="ts" setup>
import {
  NP,
  NH3,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NDivider,
  NStep,
  NSteps,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSelect,
} from "naive-ui";
import TransfyUploadVideo from "./TransfyUploadVideo.vue";
import ImpPageContainer from "@render/components/global/ImpPageContainer.vue";
import { computed, ref } from "vue";
import { EngineModel, EngineModelKeyType } from "../Task/transfy.enum";
import { TransfyFormDTO } from "./Upload.data";

const currentRef = ref<number | undefined>(1);

const model = ref(new TransfyFormDTO());
const currentStatus = ref<"wait" | "error" | "finish" | "process">("process");
const engineModelOpts = computed(() => {
  const options = [];
  for (const key in EngineModel) {
    // if (Object.prototype.hasOwnProperty.call(EngineModel, key)) {
    // }
    const element = EngineModel[key as EngineModelKeyType];
    options.push({
      label: element,
      value: key,
    });
  }
  return options;
});
const current = currentRef;
</script>
