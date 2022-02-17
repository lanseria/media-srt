import { EVENTS } from "@common/events";
import { ipcInstance } from "@render/plugins";
import { useIpc } from "@render/plugins/ipc";
import { useFileStore } from "@render/store/modules/file";

const ipc = useIpc();
const fileStore = useFileStore();
export class FileOperate {
  static instance: any;
  constructor() {
    if (FileOperate.instance) {
      return FileOperate.instance;
    }
    this.onOpenFileDialog();
    FileOperate.instance = this;
  }

  // electron 打开文件
  openFileDialog(uploadId: string) {
    fileStore.initUploadMediaData(uploadId);
    ipcInstance.send(EVENTS.OPEN_FILE, uploadId);
  }
  // 打开文件后的信息
  onOpenFileDialog() {
    ipc.on(EVENTS.REPLY_OPEN_FILE, (data: UploadMediaData) => {
      fileStore.overrideUploadMediaData(data);
    });
  }
}

FileOperate.instance = null;
