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
import { ref } from "vue";
import { NButton, NIcon, NP, NText, NCard } from "naive-ui";
import { Archive as ArchiveIcon } from "@vicons/ionicons5";
import { FileOperate } from "@render/api/file";
// import { uploadFileReq } from "/@/api/File";
// import { CustomRequest } from "naive-ui/lib/upload/src/interface";
import { useVModel } from "@vueuse/core";

const fileOperate = new FileOperate();
const props = defineProps({
  poster: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:poster"]);
const uploadposter = useVModel(props, "poster", emit);
const handleOpenFile = () => {
  fileOperate.openFileDialog();
};
</script>
