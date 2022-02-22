<template>
  <n-scrollbar style="max-height: 450px">
    <n-form>
      <n-form-item label="ffmpeg 命令">
        <n-card>
          <n-code :code="code" language="shell" inline />
        </n-card>
      </n-form-item>
      <n-form-item label="字幕文件内容">
        <n-space>
          <n-radio-group v-model:value="value" name="radiogroup">
            <n-space>
              <n-radio
                v-for="item in types"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>

              <div style="display: flex; justify-content: center; width: 100%">
                <n-button type="primary" size="small" @click="handleExport()"
                  >导出下载</n-button
                >
              </div>
            </n-space>
          </n-radio-group>
          <n-scrollbar style="max-height: 200px">
            <n-input
              :value="valueString"
              type="textarea"
              placeholder="字幕文件内容"
              :autosize="{
                minRows: 3,
              }"
              disabled
            />
          </n-scrollbar>
        </n-space>
      </n-form-item>
    </n-form>
  </n-scrollbar>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  NCode,
  NInput,
  NScrollbar,
  NForm,
  NFormItem,
  NCard,
  NRadio,
  NRadioGroup,
  NSpace,
  NButton,
} from "naive-ui";
import { useTransfyStore } from "@render/store/modules/transfy";
import { buildFile, srt2webvtt } from "@common/utils";
import { stringDownload } from "@render/api/file";
const transfyStore = useTransfyStore();
const value = ref("srt");
const valueString = computed(() => {
  const srtContent = buildFile(transfyStore.subtitles);
  if (value.value === "vtt") {
    return srt2webvtt(srtContent);
  }
  return buildFile(transfyStore.subtitles);
});
const handleExport = () => {
  stringDownload(
    valueString.value,
    `${transfyStore.transfy.name}.${value.value}`
  );
};
const code =
  "$ ffmpeg -i test_1280x720_3.mkv -vf subtitles=test_1280x720_3.srt out.mp4";
const types = [
  {
    value: "srt",
    label: ".SRT",
  },
  {
    value: "vtt",
    label: ".WebVtt",
  },
];
</script>
