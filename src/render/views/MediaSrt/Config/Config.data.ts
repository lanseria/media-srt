import { CommonDTO } from "@common/dto";
import { IConfig } from "@render/db";

export class ConfigForm extends CommonDTO implements IConfig {
  id?: number;
  updatedAt: number;
  TENCENT_SECRET_ID = "";
  TENCENT_SECRET_KEY = "";
  TENCENT_COS_BUCKET = "";
  TENCENT_COS_REGION = "";
}
