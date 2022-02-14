<template>
  <imp-page-container>
    <div class="data-table-header">
      <n-space align="center">
        <n-button type="primary" @click="handleAdd()">新增</n-button>
      </n-space>
    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="false"
      :bordered="false"
    ></n-data-table>
  </imp-page-container>
  <config-modal ref="ConfigModalRef"></config-modal>
</template>
<script lang="ts" setup>
import { NSpace, NButton, NDataTable } from "naive-ui";
import { ref, h } from "vue";
import { Observable } from "rxjs";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db, IConfig } from "@render/db";
import ConfigModal from "./ConfigModal.vue";
import dayjs from "dayjs";
import ImpPageContainer from "@render/components/global/ImpPageContainer.vue";
import { serialize } from "@common/utils";

const columns = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "SECRET_ID",
    key: "TENCENT_SECRET_ID",
  },
  {
    title: "SECRET_KEY",
    key: "TENCENT_SECRET_KEY",
  },
  {
    title: "COS_BUCKET",
    key: "TENCENT_COS_BUCKET",
  },
  {
    title: "COS_REGION",
    key: "TENCENT_COS_REGION",
  },
  {
    title: "Action",
    key: "actions",
    render: (row: IConfig, rowIndex: number) => {
      return h(NSpace, null, {
        default: () => {
          const spaceList = [
            h(
              NButton,
              {
                tertiary: true,
                size: "small",
                onClick: () => db.configs.delete(row.id),
              },
              { default: () => "Delete" }
            ),
          ];
          if (rowIndex) {
            spaceList.push(
              h(
                NButton,
                {
                  secondary: true,
                  type: "primary",
                  size: "small",
                  onClick: () => {
                    row.updatedAt = +dayjs();
                    const form = serialize(row);
                    db.configs.put(form);
                  },
                },
                { default: () => "Select" }
              )
            );
          } else {
            spaceList.push(
              h(
                NButton,
                {
                  disabled: true,
                  type: "primary",
                  size: "small",
                  onClick: () => db.configs.delete(row.id),
                },
                { default: () => "Selected" }
              )
            );
          }
          return spaceList;
        },
      });
    },
  },
];
const data = useObservable<IConfig[]>(
  liveQuery(() =>
    db.configs.orderBy("updatedAt").reverse().toArray()
  ) as unknown as Observable<IConfig[]>
);
// refs
const ConfigModalRef = ref();
// methods
const handleAdd = () => {
  ConfigModalRef.value.open();
};
</script>
<style lang="css" scoped>
.data-table-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
