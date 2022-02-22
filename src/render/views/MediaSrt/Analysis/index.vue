<template>
  <n-layout>
    <n-layout-header style="padding: 24px">
      <n-page-header @back="handleBack">
        <template #title>
          {{ transfyDto.name }}
        </template>
        <template #subtitle>
          最近保存：
          <n-time :time="transfyDto.updatedAt / 1000" unix />
        </template>
        <template #avatar>
          <n-avatar :src="transfyDto.poster" />
        </template>
        <template #extra>
          <n-space>
            <n-button>导入字幕</n-button>
            <n-button @click="handleResplit()">重新分割</n-button>
            <n-button type="primary" @click="handleSave()">保存</n-button>
            <!-- <n-button type="primary" @click="handleExport()">导出下载</n-button> -->
          </n-space>
        </template>
      </n-page-header>
    </n-layout-header>
    <n-layout style="height: 550px; margin: 24px" has-sider>
      <n-layout-sider
        width="500"
        content-style="padding: 24px; display: flex; align-items: center; position: relative"
      >
        <video
          v-if="transfyDto.rawPath"
          id="MediaRef"
          :src="`http://localhost:6789/video?video=${encodeURIComponent(
            transfyDto.rawPath
          )}`"
          controls
          style="width: 452px"
          @canplay="onCanplay"
        ></video>
        <subtitles-media-wrap></subtitles-media-wrap>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <subtitles-edit></subtitles-edit>
      </n-layout-content>
    </n-layout>
    <n-layout-footer>
      <wave-footer></wave-footer>
    </n-layout-footer>
  </n-layout>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import {
  NPageHeader,
  NSpace,
  NButton,
  NAvatar,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NTime,
} from "naive-ui";
import SubtitlesEdit from "./components/subtitles-edit/index.vue";
import { useImpRoute } from "@render/hooks/useRoute";
import { useTransfyStore } from "@render/store/modules/transfy";
import WaveFooter from "./components/wave/index.vue";
import SubtitlesMediaWrap from "./components/subtitles-media-wrap/index.vue";
import { TransfyDTO } from "@common/dto";
import { db } from "@render/db";
import { useAppStore } from "@render/store/modules/app";
// store
const appStore = useAppStore();
const transfyStore = useTransfyStore();
const { route, goBack } = useImpRoute();
// ref
const transfyDto = ref(new TransfyDTO());
// computed
const id = computed(() => {
  return route.params.id as string;
});
// events
const onCanplay = (e: Event) => {
  document.querySelector("#MediaRef")?.setAttribute("controls", "true");
  // const avHtml = document.querySelector('#MediaRef') as HTMLMediaElement;
  // transfyStore.setMediaElt(avHtml);
  transfyStore.$patch({
    videoLoaded: true,
  });
};
// method
const handleResplit = async () => {
  // const { payload } = await resplitSubtitleReq(id.value);
  // if (payload) {
  //   loadPage();
  // }
};

const handleSave = async () => {
  const res = await transfyStore.saveSubtitles();
  if (res) {
    window.$message.success("保存成功");
  } else {
    window.$message.error("保存失败");
  }
};

// const handleExport = () => {
//   transfyStore.exportSubtitles();
// };

const handleBack = () => {
  appStore.setCollapsed(false);
  goBack();
};

const loadPage = async () => {
  const payload = await db.transfy.get(+id.value);
  transfyDto.value.mergeProperties(payload);
  transfyStore.setTransfy(transfyDto.value);
  await transfyStore.loadSubtitles();
};
// hook
onMounted(() => {
  appStore.setCollapsed(true);
  loadPage();
});
</script>
