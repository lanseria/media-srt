<template>
  <div ref="TransfyCardRef">
    <n-card
      :title="item.name"
      hoverable
      header-style="padding:15px 24px 10px 24px"
      content-style="padding:0 24px 10px 24px"
    >
      <template #cover>
        <div class="poster-cover">
          <img :src="item.poster" />
          <div class="category-wrap">
            <div class="category-text">
              <span class="span-text">{{
                TransfyCategory[item.category]
              }}</span>
            </div>
          </div>
        </div>
      </template>
      <div v-if="!isHovered">{{ TransfyStatus[item.status] }}</div>
      <template #footer>
        <n-space v-if="isHovered" justify="space-between" style="height: 53px">
          <n-button
            v-if="
              ['identify_failed', 'to_be_identifying'].includes(item.status)
            "
            type="primary"
            text
            @click="handleRunRec(item)"
          >
            <template #icon>
              <n-icon>
                <play-icon />
              </n-icon>
            </template>
            开始识别
          </n-button>
          <n-button
            v-else
            type="primary"
            text
            @click="handleRunProofread(item)"
          >
            <template #icon>
              <n-icon>
                <play-icon />
              </n-icon>
            </template>
            校对字幕
          </n-button>

          <n-button type="error" text @click="handleDel(item)">
            <template #icon>
              <n-icon>
                <TrashOutlineIcon />
              </n-icon>
            </template>
            删除
          </n-button>
        </n-space>
        <n-time
          v-else
          :time="item.updatedAt"
          format="yyyy-MM-dd hh:mm:ss"
          unix
        />
      </template>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from "vue";
import { NCard, NTime, NIcon, NButton, NSpace } from "naive-ui";
import { TransfyStatus, TransfyCategory } from "./transfy.enum";
import { useElementHover } from "@vueuse/core";
import {
  Play as PlayIcon,
  TrashOutline as TrashOutlineIcon,
} from "@vicons/ionicons5";
// import { deleteTransfyReq, runTransfyRecTaskReq } from '/@/api/Admin/TransfyAi/Transfy';
import { useImpRoute } from "@render/hooks/useRoute";
const props = defineProps({
  item: {
    type: Object as PropType<ITransfy>,
    required: true,
  },
});
const { pushPath } = useImpRoute();
const TransfyCardRef = ref();
const isHovered = useElementHover(TransfyCardRef);
// method
const handleRunProofread = (row: ITransfy) => {
  pushPath(`/dashboard/transfy/${row.id}/video-edit`);
};
const handleRunRec = (row: ITransfy) => {
  window.$dialog.info({
    title: "注意",
    content: `即将开始执行识别录音任务？`,
    positiveText: "执行",
    negativeText: "取消",
    onPositiveClick: async () => {
      // const res = await runTransfyRecTaskReq(row.id);
      console.log(res);
      window.$message.success("执行成功");
    },
    onNegativeClick: () => {},
  });
};
const handleDel = (row: ITransfy) => {
  window.$dialog.error({
    title: "注意",
    content: `你确定删除这些项目？`,
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      const ids = [row.id];
      // await deleteTransfyReq(ids);
      window.$message.success("删除成功");
    },
    onNegativeClick: () => {},
  });
};
</script>
<style lang="css" scoped>
.poster-cover {
  position: relative;
}
.category-wrap {
  position: absolute;
  opacity: 0.8;
  background: rgb(0, 0, 0);
  top: 0px;
  left: 0px;
  height: 24px;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  display: -webkit-flex;
}
.category-text {
  color: rgb(255, 255, 255);
  padding: 0px 6px;
}
.span-text {
  color: rgb(255, 255, 255);
  padding: 0px 6px;
}
</style>
