import { ImportJson, UploadMedia } from "@common/dto";
import { defineStore } from "pinia";
import { EVENTS } from "@common/events";
import { ipcInstance } from "@render/plugins";
interface FileState {
  uploadMediaData: Nullable<UploadMediaData>;
  importData: Nullable<ImportData>;
  saveLoading: boolean;
}

export const useFileStore = defineStore({
  id: "file",
  state: (): FileState => {
    return {
      uploadMediaData: null,
      importData: null,
      saveLoading: false,
    };
  },
  actions: {
    // ipc
    // electron 打开媒体文件
    openFileDialog(id: string) {
      this.initUploadMediaData(id);
      ipcInstance.send(EVENTS.OPEN_FILE, id);
    },
    // 保存导出文件
    saveFileDialog(title: string, path: string, data: IObj) {
      ipcInstance.send(EVENTS.SAVE_FILE, {
        title,
        path,
        data,
      });
    },
    importFileDialog(id: string) {
      this.initImportData(id);
      ipcInstance.send(EVENTS.OPEN_IMPORT_FILE, id);
    },
    // 初始化
    initUploadMediaData(id: string) {
      this.uploadMediaData = new UploadMedia({
        uploadId: id,
      });
    },
    initImportData(id: string) {
      this.importData = new ImportJson({
        id,
      });
    },
    // 覆盖信息
    overrideUploadMediaData(data: UploadMediaData) {
      this.uploadMediaData = data;
    },
  },
});
