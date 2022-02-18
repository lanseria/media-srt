import { CommonDTO } from "@common/dto";
import { ITransfy } from "@render/db";
import {
  EngineModelKeyType,
  TransfyCategoryKeyType,
  TransfyStatusKeyType,
} from "../Task/transfy.enum";

export class TransfyFormDTO extends CommonDTO {
  constructor(category: TransfyCategoryKeyType = "video") {
    super();
    this.category = category;
  }
  engineModel: EngineModelKeyType = "16k_zh_video";
  name: string = "";
  rawPath: string = "";
  audioPath: string = "";
  poster: string = "";
  category: TransfyCategoryKeyType = "video";
  updatedAt = 0;
}

export class TransfyDTO extends CommonDTO implements ITransfy {
  rawPath: string = "";
  audioPath: string = "";
  rawData: string = "";
  splitData: string = "";
  errorDetail: string = "";
  id?: number;
  poster: string = "";
  status: TransfyStatusKeyType = "to_be_identifying";
  updatedAt: number = 0;
  name: string = "";
  engineModel: EngineModelKeyType = "16k_zh_video";
  category: TransfyCategoryKeyType = "video";
}
