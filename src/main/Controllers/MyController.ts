import { Controller, IpcInvoke, IpcOn } from "../decorators";
import { MyService } from "../Services/MyService";
import { EVENTS } from "@common/events";
import { FileService } from "@main/Services/FileService";
import { Ffmpeg } from "@main/utils/ffmpeg";
import { imageToBase64 } from "@main/utils/image";
import * as mockjs from "mockjs";
import { UploadMedia } from "@common/dto";

@Controller()
export class MyController {
  constructor(private myService: MyService, private fileService: FileService) {}
  // IpcOn
  @IpcOn(EVENTS.REPLY_MSG)
  public replyMsg(msg: string) {
    return `${this.myService.getDelayTime()} seconds later, the main process replies to your message: ${msg}`;
  }
  @IpcOn(EVENTS.REPLY_OPEN_FILE)
  public replyOpenFile(data: IObj): UploadMediaData {
    return new UploadMedia(data);
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
        // 如果取消
        this.replyOpenFile({
          uploadId,
          finished: true,
        });
      }
      // 原始媒体路径
      const rawPath = fileObj.filePaths[0];
      // 处理音频路径
      let audioPath = "";
      // 封面
      let poster = "";

      // 1. 读取文件信息
      this.replyOpenFile({
        uploadId,
        finished: false,
        step: 1,
        msg: "读取文件信息",
      });
      const mediaInfoStreams = await Ffmpeg.readMediaProbe(rawPath);

      // 类型
      const category = Ffmpeg.audioOrVideo(mediaInfoStreams);
      if (category === "audio") {
        // 2. 读取音频封面
        this.replyOpenFile({
          uploadId,
          finished: false,
          step: 2,
          msg: "读取音频封面",
        });
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
        // 2. 分离视频中的音频
        this.replyOpenFile({
          uploadId,
          finished: false,
          step: 2,
          msg: "分离视频中的音频",
        });
        audioPath = await Ffmpeg.extractAudioFromVideo(rawPath);
        // 3. 生成视频封面
        this.replyOpenFile({
          uploadId,
          finished: false,
          step: 3,
          msg: "生成视频封面",
        });
        poster = await Ffmpeg.videoCover(rawPath);
        poster = (await imageToBase64(poster)) ?? poster;
      }

      this.replyOpenFile({
        uploadId,
        category,
        poster,
        rawPath,
        audioPath,
        finished: true,
      });
    } catch (error) {
      this.replyOpenFile({
        uploadId,
        finished: true,
        msg: error,
      });
    }
  }
}
