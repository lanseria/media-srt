import { CosClient, IconfigToTencentOpt } from "@main/utils/cos";
import { RecClient, RecOpt } from "@main/utils/rec";
import { Subtitles } from "@main/utils/subtitles";
import { IConfig } from "@render/db";
import { TaskStatus } from "tencentcloud-sdk-nodejs/tencentcloud/services/asr/v20190614/asr_models";

export class TencentService {
  private config: TencentOpt;
  private cosClient: CosClient;
  private recClient: RecClient;
  constructor(config: IConfig) {
    this.config = IconfigToTencentOpt(config);
    this.cosClient = new CosClient(this.config);
    this.recClient = new RecClient(this.config);
  }

  public async uploadToCOS(bufferedFile: BufferedFile) {
    try {
      const uploadRes = await this.cosClient.uploadFile(bufferedFile);
      if (/2\d\d/.test(uploadRes.statusCode!.toString())) {
        // Logger.log(getRes.Url, "上传 COS 对象成功");
        const getRes = await this.cosClient.getObjectUrl(
          bufferedFile.originalname
        );
        return getRes;
      } else {
        // Logger.error(uploadRes);
        throw new Error("上传 COS 对象失败");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async recAudio(recOpt: RecOpt) {
    try {
      const taskStatusResult = await this.recClient.getDescResultData(recOpt);
      return taskStatusResult;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async genSliceSubtitles(taskStatusResult: TaskStatus) {
    try {
      const subtitles = new Subtitles(taskStatusResult);
      const sliceData = subtitles.buildSliceData();
      return sliceData;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
