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
  objectName: string = "";
  category: TransfyCategoryKeyType = "video";
}

export class TransfyDTO extends CommonDTO implements ITransfy {
  errorDetail: string;
  recResJsonObjectName: string = "";
  recResJsonUrl: string = "";
  id?: number;
  url: string = "";
  poster: string = "";
  status: TransfyStatusKeyType = "to_be_identifying";
  updatedAt: number = 0;
  name: string = "";
  objectName: string = "";
  engineModel: EngineModelKeyType = "16k_zh_video";
  category: TransfyCategoryKeyType = "video";
}
