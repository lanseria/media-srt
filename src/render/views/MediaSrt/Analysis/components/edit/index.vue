<template>
  <n-spin :show="subtitlesLoading">
    <n-data-table
      class="subtitles-data-table"
      ref="table"
      :columns="columns"
      :data="subtitles"
      :max-height="400"
      :row-key="(row) => row.id"
      :row-props="rowProps"
    >
      <template #empty>
        <n-empty style="padding: 100px 0" description="加载中">
          <template #icon>
            <n-icon>
              <airplane-icon />
            </n-icon>
          </template>
          <template #extra>
            <n-button size="small" @click="() => handleRefresh()"
              >刷新试试</n-button
            >
          </template>
        </n-empty>
      </template>
    </n-data-table>
  </n-spin>
</template>
<script lang="ts" setup>
import { computed, ref, h } from "vue";
import { NButton, NIcon, NInput, NEmpty, NSpin, NDataTable } from "naive-ui";
import SrtTimestamp from "../srt-timestamp/index.vue";

import {
  AddOutline as AddOutlineIcon,
  TrashSharp as TrashSharpIcon,
  GitMergeOutline as GitMergeOutlineIcon,
  GitPullRequestOutline as GitPullRequestOutlineIcon,
  Airplane as AirplaneIcon,
} from "@vicons/ionicons5";
import { useTransfyStore } from "@render/store/modules/transfy";
import { TableColumns } from "naive-ui/lib/data-table/src/interface";
const operations = [
  {
    icon: GitMergeOutlineIcon,
    text: "分割",
    func: () => {},
  },
  {
    icon: AddOutlineIcon,
    text: "插入",
    func: () => {},
  },
  {
    icon: GitPullRequestOutlineIcon,
    text: "合并",
    func: () => {},
  },
  {
    icon: TrashSharpIcon,
    text: "删除",
    func: () => {},
  },
];
const columns = ref<TableColumns<SubtitlesItem>>([
  {
    title: "ID",
    key: "index",
    width: 55,
    render(item, rowIndex: number) {
      return h("span", rowIndex);
    },
  },
  {
    title: "时间戳",
    key: "timestamp",
    width: 150,
    render(item, rowIndex: number) {
      // <SrtTimestamp v-model:timestamp="item.StartMs"></SrtTimestamp>
      // <SrtTimestamp v-model:timestamp="item.EndMs"></SrtTimestamp>
      return h(
        "div",
        {},
        {
          default: () => [
            h(SrtTimestamp, {
              timestamp: item.StartMs,
            }),
            h(SrtTimestamp, {
              timestamp: item.EndMs,
            }),
          ],
        }
      );
    },
  },
  {
    title: "字幕内容",
    key: "FinalSentence",
    render(item, rowIndex: number) {
      // <n-input type="text" size="small" v-model:value="item.FinalSentence" />
      return h(NInput, {
        type: "text",
        size: "small",
        value: item.FinalSentence,
        onUpdateValue: (value) => {
          transfyStore.setSubtitlesFSentence(value, item.id);
        },
      });
    },
  },
  {
    title: "操作",
    key: "operation",
    width: 55,
    render(item, rowIndex: number) {
      return h(
        "div",
        {
          style: "margin-right: 15px; width: 40px",
        },
        {
          default: () =>
            operations.map((m) =>
              h(
                NButton,
                {
                  text: true,
                  style: "font-size: 14px",
                },
                {
                  default: () =>
                    h(
                      NIcon,
                      {},
                      {
                        default: () => h(m.icon),
                      }
                    ),
                }
              )
            ),
        }
      );
    },
  },
]);
const transfyStore = useTransfyStore();
const subtitles = computed(() => {
  return transfyStore.subtitles;
});
const subtitlesLoading = computed(() => {
  return transfyStore.subtitlesLoading;
});
// method
const handleRefresh = () => {
  transfyStore.loadSubtitles();
};
const rowProps = (row: SubtitlesItem) => {
  return {
    class: { active: row.id === transfyStore.waveId, hover: true },
    onClick: () => {
      transfyStore.setMediaTime(row.StartMs, row.id);
    },
  };
};
</script>
<style lang="css" scoped>
.subtitles-data-table :deep(tr.hover:hover > .n-data-table-td:first-of-type) {
  border-left: 2px solid var(--n-th-icon-color-active);
}
.subtitles-data-table :deep(tr.active > .n-data-table-td:first-of-type) {
  border-left: 2px solid var(--n-th-icon-color-active);
}
.subtitles-data-table :deep(tr.hover:hover > td) {
  background-color: var(--n-merged-th-color-hover);
}
</style>
