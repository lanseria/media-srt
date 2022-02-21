<template>
  <imp-page-container :showHeader="false">
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <div class="light-green grid-box">
          <n-h3 prefix="bar">添加任务</n-h3>
          <n-grid x-gap="12" :cols="4">
            <n-gi>
              <n-card
                title="视频字幕"
                hoverable
                embedded
                :bordered="false"
                v-advance-click="handleAddVideoSrt"
                >视频语音转文字，可进行翻译，生成字幕</n-card
              >
            </n-gi>
            <n-gi>
              <n-card title="音频字幕" hoverable embedded :bordered="false"
                >音频语音转文字，可进行翻译，生成字幕</n-card
              >
            </n-gi>
            <n-gi>
              <n-card title="字幕翻译" hoverable embedded :bordered="false"
                >AI智能翻译，支持多语种字幕文件</n-card
              >
            </n-gi>
          </n-grid>
        </div>
      </n-gi>
      <n-gi>
        <div class="green grid-box">
          <n-h3 prefix="bar" type="info">我的任务</n-h3>
          <n-grid x-gap="12" :cols="4">
            <n-gi v-for="item in pagedTable" :key="item.id">
              <transfy-item :item="item"></transfy-item>
            </n-gi>
          </n-grid>
          <n-empty v-if="!pagedTable?.length" description="你什么也找不到">
            <template #extra>
              <n-button>看看别的</n-button>
            </template>
          </n-empty>
        </div>
      </n-gi>
    </n-grid>
  </imp-page-container>
</template>

<script lang="ts" setup>
import ImpPageContainer from "@render/components/global/ImpPageContainer.vue";
import { NGrid, NGi, NH3, NCard, NEmpty, NButton } from "naive-ui";
import { useImpRoute } from "@render/hooks/useRoute";
import TransfyItem from "./TransfyItem.vue";
import { db, ITransfy } from "@render/db";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { Observable } from "rxjs";
import { onMounted } from "vue";
import { EVENTS } from "@common/events";
import { useIpc } from "@render/plugins";
// use
const ipc = useIpc();
const { pushPath } = useImpRoute();
// ref
const pagedTable = useObservable<ITransfy[]>(
  liveQuery(() =>
    db.transfy.orderBy("updatedAt").reverse().toArray()
  ) as unknown as Observable<ITransfy[]>
);
// mounted
onMounted(() => {
  ipc.on(EVENTS.REPLY_REC_AUDIO, (data: RecAudioData) => {
    console.log(data);
    db.transfy.update(data.id, {
      rawData: data.rawData,
      splitData: data.splitData,
      errorDetail: data.msg,
      status: data.finished
        ? "to_be_proofread"
        : data.step === data.totalStep
        ? "identify_failed"
        : "identifying",
    });
  });
});
const handleAddVideoSrt = () => {
  pushPath("/media-srt/upload");
};
</script>
<style lang="css" scoped>
.grid-box {
  padding: 25px;
}
.light-green {
  background-color: rgba(131, 131, 131, 0.1);
}
.green {
  background-color: rgba(131, 131, 131, 0);
}
</style>
