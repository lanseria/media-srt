<template>
  <n-space vertical>
    <n-button :disabled="btnDisabled" @click="handleOpenFile()">
      <template #icon>
        <n-icon>
          <archive-icon />
        </n-icon>
      </template>
      上传媒体</n-button
    >
    <n-image width="200" :src="uploadPoster" alt="" />
  </n-space>
</template>
<script lang="ts" setup>
import { nanoid } from "nanoid";
import { onMounted, ref } from "vue";
import { NButton, NIcon, NP, NText, NCard, NImage, NSpace } from "naive-ui";
import { Archive as ArchiveIcon } from "@vicons/ionicons5";
import { FileOperate } from "@render/api/file";
// import { uploadFileReq } from "/@/api/File";
// import { CustomRequest } from "naive-ui/lib/upload/src/interface";
import { useVModel } from "@vueuse/core";
import { useFileStore } from "@render/store/modules/file";

const fileOperate = new FileOperate();
const props = defineProps({
  poster: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:poster"]);
// store
const fileStore = useFileStore();
// let
let uploadId = nanoid();
// ref
const btnDisabled = ref(false);
const uploadPoster = useVModel(props, "poster", emit);
const handleOpenFile = () => {
  uploadId = nanoid();
  btnDisabled.value = true;
  fileOperate.openFileDialog(uploadId);
  fileStore.$onAction(
    ({
      name, // name of the action
      store, // store instance, same as `someStore`
      args, // array of parameters passed to the action
      after, // hook after the action returns or resolves
      onError, // hook if the action throws or rejects
    }) => {
      // a shared variable for this specific action call
      const startTime = Date.now();
      // this will trigger before an action on `store` is executed
      console.log(`Start "${name}" with params [${args.join(", ")}].`);

      // this will trigger if the action succeeds and after it has fully run.
      // it waits for any returned promised
      after((result) => {
        if (name === "overrideUploadMediaData") {
          console.log(store.uploadMediaFileDataList);
          const data = store.uploadMediaFileDataList.find(
            (m) => m.uploadId === uploadId
          );
          if (data) {
            uploadPoster.value = data.poster;
          }
          btnDisabled.value = false;
        }
        console.log(
          `Finished "${name}" after ${
            Date.now() - startTime
          }ms.\nResult: ${result}.`
        );
      });
      // this will trigger if the action throws or returns a promise that rejects
      onError((error) => {
        console.warn(
          `Failed "${name}" after ${
            Date.now() - startTime
          }ms.\nError: ${error}.`
        );
      });
    }
  );
};
</script>
