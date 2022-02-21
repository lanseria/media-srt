import { EngineModelKeyType } from "@render/views/MediaSrt/Task/transfy.enum";
import {
  CreateRecTaskResponse,
  DescribeTaskStatusResponse,
  TaskStatus,
} from "tencentcloud-sdk-nodejs/tencentcloud/services/asr/v20190614/asr_models";
import { Asr } from "./asr";

export interface RecOpt {
  Name: string;
  Url: string;
  EngineModelType: EngineModelKeyType;
  taskStatusResult?: TaskStatus;
}

export class RecClient {
  private asrClient;
  private log: Function;
  constructor(tencentOpt: TencentOpt, log = console.log) {
    const asr = new Asr(tencentOpt, "asr.tencentcloudapi.com");
    this.asrClient = asr.asr;
    this.log = log;
  }

  private createRecTask(recOpt: RecOpt): Promise<CreateRecTaskResponse> {
    return new Promise((resolve, reject) => {
      this.asrClient
        .CreateRecTask({
          EngineModelType: recOpt.EngineModelType ?? "16k_zh_video",
          ChannelNum: 1,
          ResTextFormat: 2,
          SourceType: 0,
          Url: recOpt.Url,
          FilterPunc: 1,
        })
        .then(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  private describeTaskStatus(
    TaskId: number
  ): Promise<DescribeTaskStatusResponse> {
    return new Promise((resolve, reject) => {
      this.asrClient
        .DescribeTaskStatus({
          TaskId,
        })
        .then(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getDescResultData(recOpt: RecOpt): Promise<TaskStatus> {
    return new Promise(async (resolve, reject) => {
      const createResult = await this.createRecTask(recOpt);
      if (createResult.Data.TaskId) {
        const { TaskId } = createResult.Data;
        const timer = setInterval(async () => {
          const descResult = await this.describeTaskStatus(TaskId);
          const { StatusStr, Status } = descResult.Data;
          this.log(
            `识别结果查询响应：${StatusStr}`,
            "RecClient-getDescResultData"
          );
          if ([0, 1].includes(Status)) {
            // console.log('继续查询');
          } else {
            // 退出轮询
            clearInterval(timer);
            if (Status === 2) {
              this.log("执行成功", "getDescResultData-getDescResultData");
              resolve(descResult.Data);
            } else {
              this.log(JSON.stringify(descResult));
              this.log("执行失败", "getDescResultData-getDescResultData");
              reject(JSON.stringify(descResult));
            }
          }
        }, 5000);
      }
    });
  }
}
