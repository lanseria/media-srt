import { UploadMedia } from "@common/dto";
import { defineStore } from "pinia";
import { EVENTS } from "@common/events";
import { ipcInstance } from "@render/plugins";
interface FileState {
  uploadMediaData: Nullable<UploadMediaData>;
}

export const useFileStore = defineStore({
  id: "file",
  state: (): FileState => {
    return {
      uploadMediaData: null,
    };
  },
  actions: {
    // ipc
    // electron 打开文件
    openFileDialog(uploadId: string) {
      this.initUploadMediaData(uploadId);
      ipcInstance.send(EVENTS.OPEN_FILE, uploadId);
    },
    // 初始化
    initUploadMediaData(id: string) {
      this.uploadMediaData = new UploadMedia({
        uploadId: id,
      });
    },
    // 覆盖信息
    overrideUploadMediaData(data: UploadMediaData) {
      this.uploadMediaData = data;
    },
  },
});
