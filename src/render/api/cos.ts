import COS from "cos-js-sdk-v5";
import { db } from "@render/db/index";

// TODO: COS动态读取配置
export const retCosOpt = async () => {
  const configs = await db.configs.orderBy("updatedAt").reverse().toArray();
  if (configs.length >= 1) {
    const config = configs[0];
    return config;
  } else {
    throw new Error("No Configuration!");
  }
};
// TODO: COS文件列表
export const generateCos = async () => {
  try {
    // SecretId 和 SecretKey请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
    const config = await retCosOpt();
    const cos = new COS({
      SecretId: config.TENCENT_SECRET_ID,
      SecretKey: config.TENCENT_SECRET_KEY,
    });
    return cos;
  } catch (error: any) {
    console.log(error);
  }
};
