import { mergeProperties } from "./utils";

export class MultipleContactDTO {
  orgs: IObj[] = [];
  users: IObj[] = [];
}

export class CommonDTO {
  mergeProperties(obj?: IObj) {
    if (obj) {
      Object.assign(this, mergeProperties(this, obj));
    }
  }
}

export class UploadMedia implements UploadMediaData {
  uploadId: string = "";
  category: CodecType = "";
  rawPath: string = "";
  audioPath: string = "";
  poster: string = "";
  step = -1;
  totalStep = 4;
  finished: boolean = false;
  msg: string = "";
  constructor(obj: IObj) {
    if (obj) {
      Object.assign(this, mergeProperties(this, obj));

      if (this.category === "audio") {
        this.totalStep = 3;
      } else if (this.category === "video") {
        this.totalStep = 4;
      }
      if (this.step === -1) {
        this.step = this.totalStep;
      }
    }
  }
}
