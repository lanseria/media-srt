import { Controller, IpcInvoke, IpcOn } from "../decorators";
import { MyService } from "../Services/MyService";
import { EVENTS } from "@common/events";
import { FileService } from "@main/Services/FileService";

@Controller()
export class MyController {
  constructor(private myService: MyService, private fileService: FileService) {}
  // IpcOn
  @IpcOn(EVENTS.REPLY_MSG)
  public replyMsg(msg: string) {
    return `${this.myService.getDelayTime()} seconds later, the main process replies to your message: ${msg}`;
  }
  @IpcOn(EVENTS.REPLY_OPEN_FILE)
  public replyOpenFile(uploadMediaData: UploadMediaData) {
    return uploadMediaData;
  }
  // IpcInvoke
  @IpcInvoke(EVENTS.SEND_MSG)
  public async handleSendMsg(msg: string): Promise<string> {
    setTimeout(() => {
      this.replyMsg(msg);
    }, this.myService.getDelayTime() * 1000);

    return `The main process received your message: ${msg}`;
  }

  @IpcInvoke(EVENTS.OPEN_FILE)
  public async handleOpenFile() {
    const fileObj = await this.fileService.onOpenFile();
    if (fileObj.canceled || fileObj.filePaths.length === 0) {
      return;
    }
    // 原始媒体路径
    const rawPath = fileObj.filePaths[0];
    // 处理音频路径
    let audioPath = "";
    // 封面
    let poster = "";
    const mediaInfoStreams = await this.fileService.readMediaProbe(rawPath);
    console.log(mediaInfoStreams);
    // 类型
    const category = this.fileService.audioOrVideo(mediaInfoStreams);
    console.log(category);
    if (category === "audio") {
      audioPath = rawPath;
      poster = await this.fileService.audioCover(rawPath);
    }
    if (category === "video") {
      poster = await this.fileService.videoCover(rawPath);
    }

    this.replyOpenFile({
      category,
      poster,
      rawPath,
      audioPath,
    });
  }
}
