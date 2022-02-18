import { CommonDTO } from "@common/dto";
import {
  EngineModelKeyType,
  TransfyCategoryKeyType,
  TransfyStatusKeyType,
} from "../Task/transfy.enum";

export class TransfyFormDTO extends CommonDTO {
  constructor(category: TransfyCategoryKeyType = "video") {
    super();
    this.category = category;
    this.status = "to_be_identifying";
  }
  engineModel: EngineModelKeyType = "16k_zh_video";
  name: string = "";
  rawPath: string = "";
  audioPath: string = "";
  poster: string = "";
  category: TransfyCategoryKeyType = "video";
  updatedAt = 0;
  status: TransfyStatusKeyType;
}
