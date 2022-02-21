// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
import * as tencentcloud from "tencentcloud-sdk-nodejs";
import { ClientConfig } from "tencentcloud-sdk-nodejs/tencentcloud/common/interface";

const AsrClient = tencentcloud.asr.v20190614.Client;

export class Asr {
  public asr;
  public asrConfig: ClientConfig;
  constructor(tencentOpt: TencentOpt, endpoint = "asr.tencentcloudapi.com") {
    this.asrConfig = {
      credential: {
        secretId: tencentOpt.SecretId,
        secretKey: tencentOpt.SecretKey,
      },
      region: "",
      profile: {
        httpProfile: {
          endpoint,
        },
      },
    };
    this.asr = new AsrClient(this.asrConfig);
  }
}
