import { Controller, IpcInvoke, IpcOn } from "../decorators";
import { MyService } from "../Services/MyService";
import { EVENTS } from "@common/events";
import { FileService } from "@main/Services/FileService";
import { Ffmpeg } from "@main/utils/ffmpeg";
import { imageToBase64 } from "@main/utils/image";
import * as mockjs from "mockjs";
import { RecAudio, UploadMedia } from "@common/dto";
import { IConfig, ITransfy } from "@render/db";
import { readFileRetBufedFile } from "@main/utils/cos";
import { TencentService } from "@main/Services/TencentServie";
import { RecOpt } from "@main/utils/rec";

@Controller()
export class MyController {
  constructor(private myService: MyService, private fileService: FileService) {}
  // IpcOn
  @IpcOn(EVENTS.REPLY_OPEN_FILE)
  public replyOpenFile(data: IObj): UploadMediaData {
    return new UploadMedia(data);
  }

  @IpcOn(EVENTS.REPLY_REC_AUDIO)
  public replyRecAudio(id: number, data: IObj): RecAudioData {
    const recData = { id, ...data };
    const newRecAudio = new RecAudio(recData);
    console.log(newRecAudio);
    return newRecAudio;
  }

  // IpcInvoke
  @IpcInvoke(EVENTS.OPEN_FILE)
  public async handleOpenFile(uploadId: string) {
    try {
      const fileObj = await this.fileService.onOpenFile();
      if (fileObj.canceled || fileObj.filePaths.length === 0) {
        // 如果取消
        this.replyOpenFile({
          uploadId,
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
          step: 2,
          msg: "分离视频中的音频",
        });
        audioPath = await Ffmpeg.extractAudioFromVideo(rawPath);
        // 3. 生成视频封面
        this.replyOpenFile({
          uploadId,
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
      });
    } catch (error) {
      this.replyOpenFile({
        uploadId,
        msg: error,
      });
    }
  }

  @IpcInvoke(EVENTS.REC_AUDIO)
  public async handleRecAudio({
    config,
    transfy,
  }: {
    config: IConfig;
    transfy: ITransfy;
  }) {
    console.log(transfy);
    const reply = (data: IObj) => {
      this.replyRecAudio(transfy.id!, data);
    };
    try {
      // 1. 接收数据
      reply({
        step: 1,
        msg: "接收数据",
      });
      const tencentService = new TencentService(config);
      // 2. 上传到COS获取临时文件地址
      reply({
        step: 2,
        msg: "上传到COS获取临时文件地址",
      });
      const audioBufedFile = await readFileRetBufedFile(transfy.audioPath);
      const getRes = await tencentService.uploadToCOS(audioBufedFile);
      const recOpt: RecOpt = {
        Name: transfy.name,
        Url: getRes.Url,
        EngineModelType: transfy.engineModel,
      };
      // 3. 识别并返回原始识别数据
      reply({
        step: 3,
        msg: "识别并返回原始识别数据",
      });
      const rawData = await tencentService.recAudio(recOpt);
      // 4. 分割识别数据
      reply({
        step: 4,
        msg: "分割识别数据",
        rawData,
      });
      const splitData = await tencentService.genSliceSubtitles(rawData);
      // 5. 完成识别任务
      reply({
        step: 5,
        msg: "完成识别任务",
        finished: true,
        rawData,
        splitData,
      });
    } catch (error: any) {
      reply({
        msg: error,
      });
    }
  }
}
