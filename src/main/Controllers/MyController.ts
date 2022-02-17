import { Controller, IpcInvoke, IpcOn } from "../decorators";
import { MyService } from "../Services/MyService";
import { EVENTS } from "@common/events";
import { FileService } from "@main/Services/FileService";
import { Ffmpeg } from "@main/utils/ffmpeg";
import { imageToBase64 } from "@main/utils/image";
import * as mockjs from "mockjs";
import * as path from "path";

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
    console.log(uploadMediaData);
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
  public async handleOpenFile(uploadId: string) {
    try {
      const fileObj = await this.fileService.onOpenFile();
      if (fileObj.canceled || fileObj.filePaths.length === 0) {
        this.replyOpenFile({
          uploadId,
          category: "",
          rawPath: "",
          audioPath: "",
          poster: "",
        });
        return;
      }
      // 原始媒体路径
      const rawPath = fileObj.filePaths[0];
      // 处理音频路径
      let audioPath = "";
      // 封面
      let poster = "";
      const mediaInfoStreams = await Ffmpeg.readMediaProbe(rawPath);
      // 类型
      const category = await Ffmpeg.audioOrVideo(mediaInfoStreams);
      if (category === "audio") {
        console.log(mediaInfoStreams);
        audioPath = rawPath;
        if (mediaInfoStreams.length === 2) {
          poster = await Ffmpeg.audioCover(rawPath);
          poster = (await imageToBase64(poster)) ?? poster;
        } else {
          poster = mockjs.Random.image(
            "200x200",
            "#894FC4",
            "#FFF",
            "png",
            "No_Cover"
          );
        }
      }
      if (category === "video") {
        audioPath = await Ffmpeg.extractAudioFromVideo(rawPath);
        poster = await Ffmpeg.videoCover(rawPath);
        poster = (await imageToBase64(poster)) ?? poster;
      }

      this.replyOpenFile({
        uploadId,
        category,
        poster,
        rawPath,
        audioPath,
      });
    } catch (error) {
      console.log(error);
      this.replyOpenFile({
        uploadId,
        category: "",
        rawPath: "",
        audioPath: "",
        poster: "",
      });
    }
  }
}
