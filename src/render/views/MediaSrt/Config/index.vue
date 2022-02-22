<template>
  <imp-page-container>
    <div class="data-table-header">
      <n-space align="center">
        <n-button type="primary" @click="handleAdd()">
          <template #icon>
            <n-icon>
              <add-outline-icon />
            </n-icon>
          </template>
          新增</n-button
        >
        <n-button @click="handleImport()">
          <template #icon>
            <n-icon>
              <arrow-down-circle-outline-icon />
            </n-icon>
          </template>
          导入</n-button
        >
        <n-button
          @click="handleExport()"
          :loading="saveLoading"
          :disabled="saveLoading"
        >
          <template #icon>
            <n-icon>
              <arrow-up-circle-outline-icon />
            </n-icon>
          </template>
          导出</n-button
        >
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
import {
  AddOutline as AddOutlineIcon,
  ArrowDownCircleOutline as ArrowDownCircleOutlineIcon,
  ArrowUpCircleOutline as ArrowUpCircleOutlineIcon,
} from "@vicons/ionicons5";
import { NSpace, NButton, NDataTable, NIcon } from "naive-ui";
import { ref, h, onMounted, computed } from "vue";
import { Observable } from "rxjs";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db, IConfig } from "@render/db";
import ConfigModal from "./ConfigModal.vue";
import dayjs from "dayjs";
import ImpPageContainer from "@render/components/global/ImpPageContainer.vue";
import { serialize } from "@common/utils";
import IDBExportImport from "indexeddb-export-import";
import { useFileStore } from "@render/store/modules/file";
import { useIpc } from "@render/plugins";
import { EVENTS } from "@common/events";
import { nanoid } from "nanoid";
// useIpc
const ipc = useIpc();
const fileStore = useFileStore();
const columns = [
  {
    title: "SECRET_ID",
    key: "TENCENT_SECRET_ID",
    render: (row: IConfig) => {
      return row.TENCENT_SECRET_ID.replace(/[\d+]/g, "*");
    },
  },
  {
    title: "SECRET_KEY",
    key: "TENCENT_SECRET_KEY",
    render: (row: IConfig) => {
      return row.TENCENT_SECRET_KEY.replace(/[\w+]/g, "*");
    },
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
                onClick: () => db.configs.delete(row.id!),
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
                  onClick: () => db.configs.delete(row.id!),
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
// computed
const saveLoading = computed(() => {
  return fileStore.saveLoading;
});
// mounted
onMounted(() => {
  ipc.on(EVENTS.REPLY_SAVE_FILE, (filepath) => {
    window.$message.success(`导出成功: ${filepath}`);
  });
  ipc.on(EVENTS.REPLY_OPEN_IMPORT_FILE, (obj: ImportData) => {
    db.open().then(() => {
      const idbDatabase = db.backendDB();
      IDBExportImport.clearDatabase(idbDatabase, (err) => {
        if (!err) {
          // cleared data successfully
          IDBExportImport.importFromJsonString(idbDatabase, obj.data, (err) => {
            if (!err) {
              window.$message.success("导入成功, 请重新进入");
            }
          });
        }
      });
    });
  });
});
// methods
const handleAdd = () => {
  ConfigModalRef.value.open();
};
const handleImport = () => {
  fileStore.importFileDialog(nanoid());
};
const handleExport = () => {
  db.open().then(() => {
    const idbDatabase = db.backendDB();
    IDBExportImport.exportToJsonString(idbDatabase, (err, jsonString) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Exported as JSON: " + jsonString);
        const filename = `media-srt-${+dayjs()}.json`;
        fileStore.saveFileDialog("导出数据", filename, JSON.parse(jsonString));
      }
    });
  });
};
</script>
<style lang="css" scoped>
.data-table-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
