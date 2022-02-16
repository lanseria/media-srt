import { EVENTS } from "@common/events";
import { ipcInstance } from "@render/plugins";
import { useIpc } from "@render/plugins/ipc";

const ipc = useIpc();

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
  openFileDialog() {
    ipcInstance.send(EVENTS.OPEN_FILE);
  }
  // 打开文件后的信息
  onOpenFileDialog() {
    ipc.on(EVENTS.REPLY_OPEN_FILE, (data: UploadMediaData) => {
      console.log(data);
    });
  }
}

FileOperate.instance = null;
