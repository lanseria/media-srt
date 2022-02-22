import Dexie from "dexie";
import dayjs from "dayjs";
import {
  EngineModelKeyType,
  TransfyCategoryKeyType,
  TransfyStatusKeyType,
} from "@render/views/MediaSrt/Task/transfy.enum";

export class MediaSrtDatabase extends Dexie {
  configs!: Dexie.Table<IConfig, number>;
  transfy!: Dexie.Table<ITransfy, number>;

  constructor() {
    super("MediaSrtDatabase");
    this.version(4).stores({
      configs:
        "++id, updatedAt, TENCENT_SECRET_ID, TENCENT_SECRET_KEY, TENCENT_COS_BUCKET, TENCENT_COS_REGION",
      transfy:
        "++id, updatedAt, name, category, engineModel, status, poster, rawPath, audioPath, rawData, splitData, errorDetail",
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
  category: TransfyCategoryKeyType;
  engineModel: EngineModelKeyType;
  status: TransfyStatusKeyType;

  poster: string;
  rawPath: string;
  audioPath: string;

  rawData: string;
  splitData: string;

  errorDetail: string;
}

export const db = new MediaSrtDatabase();
