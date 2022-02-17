<template>
  <n-button @click="handleOpenFile()">
    <template #icon>
      <n-icon>
        <archive-icon />
      </n-icon>
    </template>
    上传媒体</n-button
  >
</template>
<script lang="ts" setup>
import { nanoid } from "nanoid";
import { onMounted, ref } from "vue";
import { NButton, NIcon, NP, NText, NCard } from "naive-ui";
import { Archive as ArchiveIcon } from "@vicons/ionicons5";
import { FileOperate } from "@render/api/file";
// import { uploadFileReq } from "/@/api/File";
// import { CustomRequest } from "naive-ui/lib/upload/src/interface";
import { useVModel } from "@vueuse/core";
import { useFileStore } from "@render/store/modules/file";

const fileStore = useFileStore();

const fileOperate = new FileOperate();
const props = defineProps({
  poster: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:poster"]);
let uploadId = nanoid();
onMounted(() => {
  uploadId = nanoid();
});
const uploadposter = useVModel(props, "poster", emit);
const handleOpenFile = () => {
  fileOperate.openFileDialog(uploadId);
  fileStore.$onAction(({ after, onError }) => {
    after((resolvedValue) => {
      console.log(resolvedValue);
    });
    onError((error) => {
      console.log(error);
    });
  });
};
</script>
