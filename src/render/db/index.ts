import Dexie from "dexie";
import dayjs from "dayjs";

export class MediaSrtDatabase extends Dexie {
  configs!: Dexie.Table<IConfig, number>;
  transfy!: Dexie.Table<ITransfy, number>;

  constructor() {
    super("MediaSrtDatabase");
    this.version(2)
      .stores({
        configs:
          "++id, TENCENT_SECRET_ID, TENCENT_SECRET_KEY, TENCENT_COS_BUCKET, TENCENT_COS_REGION, updatedAt",
        transfy:
          "++id, name, objectName, recResJsonObjectName, errorDetail, engineModel, category, status, poster, updatedAt",
      })
      .upgrade((tx) => {
        tx.table("configs")
          .toCollection()
          .modify((config) => {
            config.updatedAt = +dayjs();
          });
      });
  }
}

export interface ICommon {
  id?: number; // Primary key. Optional (autoincremented)
  updatedAt: number;
}

// By defining the interface of table records,
// you get better type safety and code completion
export interface IConfig extends ICommon {
  TENCENT_SECRET_ID: string; // TENCENT_SECRET_ID
  TENCENT_SECRET_KEY: string; // TENCENT_SECRET_KEY
  TENCENT_COS_BUCKET: string; // TENCENT_COS_BUCKET
  TENCENT_COS_REGION: string; // TENCENT_COS_REGION
}

export interface ITransfy extends ICommon {
  id?: number;
  name: string;
  objectName: string;
  recResJsonObjectName: string;
  errorDetail: string;
  engineModel: string;
  category: string;
  status: string;
  poster: string;
}

export const db = new MediaSrtDatabase();
