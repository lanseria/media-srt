import { promises } from "fs";
import COS from "cos-nodejs-sdk-v5";
import * as fs from "fs";
import * as path from "path";
import { IConfig } from "@render/db";

export const readFileRetBufedFile = async (
  filePath: string
): Promise<BufferedFile> => {
  const originalname = path.basename(filePath);
  const mimetype = path.extname(originalname) as AppMimeType;
  const buffer = await promises.readFile(filePath);
  return {
    originalname,
    buffer,
    size: fs.statSync(filePath).size,
    mimetype,
    encoding: "",
    fieldname: filePath,
  };
};

export const IconfigToTencentOpt = (config: IConfig): TencentOpt => {
  return {
    SecretId: config.TENCENT_SECRET_ID,
    SecretKey: config.TENCENT_SECRET_KEY,
    Bucket: config.TENCENT_COS_BUCKET,
    Region: config.TENCENT_COS_REGION,
  };
};

/**
 * 环境依赖
 * 使用 SDK 需要您的运行环境包含 nodejs 以及 npm，其中 nodejs 版本要求 ≥ 6。
 * 登录 对象存储控制台 创建存储桶后，获取 存储桶名称 和 地域名称。
 * 登录 访问管理控制台 获取您的项目 SecretId 和 SecretKey。
 * https://github.com/tencentyun/cos-nodejs-sdk-v5/blob/master/demo/demo.js
 */
export class CosClient {
  private client: COS;
  private Region: string;
  private Bucket: string;
  private log: Function;
  constructor(tencentOpt: TencentOpt, log = console.log) {
    this.Region = tencentOpt.Region;
    this.Bucket = tencentOpt.Bucket;
    this.client = new COS({
      SecretId: tencentOpt.SecretId,
      SecretKey: tencentOpt.SecretKey,
    });
    this.log = log;
  }
  /**
   * 获取该区域 bucket 服务信息
   * @param Region 区域
   * @returns 返回 bucket 信息
   */
  getService(Region: string = this.Region): Promise<COS.GetServiceResult> {
    return new Promise((resolve, reject) => {
      this.client.getService(
        {
          Region,
        },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
  /**
   * 上传小文件
   * @param filePath 相对于执行cwd的路径
   * @returns
   */
  uploadFile(bufferedFile: BufferedFile): Promise<COS.PutObjectResult> {
    return new Promise((resolve, reject) => {
      const baseName = bufferedFile.originalname;
      this.client.putObject(
        {
          /* 填入您自己的存储桶，必须字段 */
          Bucket: this.Bucket,
          /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Region: this.Region,
          /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Key: baseName,
          StorageClass: "STANDARD",
          /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
          Body: fs.createReadStream(bufferedFile.fieldname), // 上传文件对象
          ContentLength: bufferedFile.size,
          onProgress: (progressData) => {
            this.log(JSON.stringify(progressData), "COS-uploadFile");
          },
        },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
  /**
   * 获得 COS 对象 Url
   * @param Key the Key
   * @returns
   */
  getObjectUrl(Key: string): Promise<COS.GetObjectUrlResult> {
    return new Promise((resolve, reject) => {
      this.client.getObjectUrl(
        {
          Bucket: this.Bucket,
          Region: this.Region,
          Key,
          Expires: 60,
          Sign: true,
        },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * 删除 COS 对象
   * @param Key the Key
   * @returns
   */
  deleteObject(Key: string): Promise<COS.DeleteObjectResult> {
    return new Promise((resolve, reject) => {
      this.client.deleteObject(
        {
          Bucket: this.Bucket,
          Region: this.Region,
          Key,
        },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}
