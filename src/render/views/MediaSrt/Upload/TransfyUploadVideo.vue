<template>
  <n-space vertical style="width: 300px">
    <n-button
      :disabled="btnDisabled"
      :loading="btnDisabled"
      @click="handleOpenFile()"
    >
      <template #icon>
        <n-icon>
          <cloud-upload-outline-icon />
        </n-icon>
      </template>
      上传媒体</n-button
    >
    <n-image v-if="processStatus.finished" width="200" :src="poster" alt="" />
    <template v-else>
      <n-progress
        type="line"
        :percentage="(processStatus.step / processStatus.totalStep) * 100"
        :height="24"
        processing
      >
      </n-progress>
      <div>
        {{ processStatus.step }}/{{ processStatus.totalStep }} -
        {{ processStatus.msg }}
      </div>
    </template>
  </n-space>
</template>
<script lang="ts" setup>
import { nanoid } from "nanoid";
import { onMounted, reactive, ref } from "vue";
import { NButton, NIcon, NImage, NSpace, NProgress } from "naive-ui";
import { CloudUploadOutline as CloudUploadOutlineIcon } from "@vicons/ionicons5";
import { useVModels } from "@vueuse/core";
import { useFileStore } from "@render/store/modules/file";

import { useIpc } from "@render/plugins/ipc";
import { EVENTS } from "@common/events";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  rawPath: {
    type: String,
    required: true,
  },
  audioPath: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});
// useIpc
const ipc = useIpc();
// store
const fileStore = useFileStore();
// let
let uploadId = nanoid();
// ref
const btnDisabled = ref(false);
const processStatus = reactive({
  finished: true,
  step: 0,
  totalStep: 0,
  msg: "",
});
const { category, rawPath, audioPath, poster } = useVModels(props);
onMounted(() => {
  console.log("onMounted");
  ipc.on(EVENTS.REPLY_OPEN_FILE, (data: UploadMediaData) => {
    fileStore.overrideUploadMediaData(data);
    processStatus.finished = data.finished;
    if (data.finished) {
      category.value = data.category;
      rawPath.value = data.rawPath;
      audioPath.value = data.audioPath;
      poster.value = data.poster;
      btnDisabled.value = false;
    } else {
      processStatus.msg = data.msg;
      processStatus.step = data.step;
      processStatus.totalStep = data.totalStep;
    }
  });
});
const handleOpenFile = () => {
  uploadId = nanoid();
  btnDisabled.value = true;
  fileStore.openFileDialog(uploadId);
};
</script>
