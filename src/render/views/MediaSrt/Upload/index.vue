<template>
  <imp-page-container :isBack="true">
    <n-layout
      style="background: transparent"
      content-style="padding:36px 0px 60px; margin:0 auto;"
    >
      <n-layout-content
        style="background: initial"
        content-style="padding:25px;"
      >
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
          <n-form-item label="上传文件：" path="poster">
            <transfy-upload-video
              v-model:category="model.category"
              v-model:rawPath="model.rawPath"
              v-model:audioPath="model.audioPath"
              v-model:poster="model.poster"
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
      </n-layout-content>

      <n-layout-footer style="background-color: initial; text-align: center">
        <n-button
          size="large"
          type="primary"
          strong
          style="width: 200px"
          @click="onSubmit()"
          >提交</n-button
        >
      </n-layout-footer>
    </n-layout>
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
import { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import dayjs from "dayjs";
import { serialize } from "@common/utils";
import { db } from "@render/db";
import { useImpRoute } from "@render/hooks/useRoute";

const currentRef = ref<number | undefined>(1);

const { goBack } = useImpRoute();
const model = ref(new TransfyFormDTO());
const currentStatus = ref<"wait" | "error" | "finish" | "process">("process");
const engineModelOpts = computed(() => {
  const options: SelectMixedOption[] = [];
  for (const key in EngineModel) {
    const element = EngineModel[key as EngineModelKeyType];
    options.push({
      label: element,
      value: key,
    });
  }
  return options;
});
const current = currentRef;
// methods
const onSubmit = () => {
  model.value.updatedAt = +dayjs();
  const form = serialize(model.value);
  db.transfy.add(form);
  goBack();
};
</script>
