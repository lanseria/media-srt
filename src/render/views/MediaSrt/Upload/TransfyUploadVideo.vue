<template>
  <n-upload
    abstract
    ref="UploadRef"
    :max="1"
    :accept="accept"
    :on-remove="handleRemove"
  >
    <div>
      <video
        v-show="showVideo"
        controls
        :src="uploadUrl"
        style="width: 480px; height: 240px"
      ></video>
      <!-- <vue3VideoPlay v-show="showVideo" v-bind="options" /> -->
      <n-upload-trigger #="{ handleClick }" abstract>
        <n-upload>
          <n-upload-dragger v-show="!showVideo" @click.stop="handleClick">
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px"
              >点击或者拖动文件到该区域来上传</n-text
            >
            <n-p depth="3" style="margin: 8px 0 0 0"
              >请不要上传敏感数据，支持 {{ accept }} 格式文件</n-p
            >
          </n-upload-dragger>
        </n-upload>
      </n-upload-trigger>

      <n-card
        v-show="showVideo"
        embedded
        :bordered="false"
        style="margin-top: 12px"
      >
        <n-upload-file-list />
      </n-card>
    </div>
  </n-upload>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  NUpload,
  NUploadDragger,
  NUploadFileList,
  NUploadTrigger,
  NIcon,
  NP,
  NText,
  NCard,
  useThemeVars,
} from "naive-ui";
import { Archive as ArchiveIcon } from "@vicons/ionicons5";
// import { uploadFileReq } from "/@/api/File";
// import { CustomRequest } from "naive-ui/lib/upload/src/interface";
import { useVModel } from "@vueuse/core";
const props = defineProps({
  objectName: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:objectName"]);
const uploadObjectName = useVModel(props, "objectName", emit);
const uploadUrl = ref("");
const UploadRef = ref();
const accept = ref(".mkv,.mp4,.flv,.avi,.mov");
const showVideo = ref(false);
const options = computed(() => {
  const themeVars = useThemeVars();
  return {
    autoPlay: false,
    width: "480px", //播放器高度
    height: "240px", //播放器高度
    color: themeVars.value.primaryColor, //主题色
    src: uploadUrl.value, //视频源
  };
});
// const customRequest: CustomRequest = ({
//   file,
//   withCredentials,
//   onFinish,
//   onError,
//   onProgress,
// }) => {
//   uploadFileReq(file, withCredentials, onProgress)
//     .then(({ payload }: any) => {
//       onFinish();
//       setTimeout(() => {
//         handleFinish(payload);
//       }, 1000);
//     })
//     .catch((error) => {
//       console.log(error);
//       onError();
//     });
// };
const handleFinish = (payload: any) => {
  showVideo.value = true;
  // console.log(payload);
  uploadObjectName.value = payload.name;
  uploadUrl.value = payload.url;
};
const handleRemove = () => {
  console.log("remove");
  showVideo.value = false;
  uploadObjectName.value = "";
  uploadUrl.value = "";
};
</script>
