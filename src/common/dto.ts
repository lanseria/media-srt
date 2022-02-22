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
  finished = false;
  msg = "";
  constructor(obj: IObj) {
    if (obj) {
      Object.assign(this, mergeProperties(this, obj));

      if (this.category === "audio") {
        this.totalStep = 3;
      } else if (this.category === "video") {
        this.totalStep = 4;
      }
      // 失败获取成功结束
      if (this.step === -1) {
        this.step = this.totalStep;
      }
      if (this.step === this.totalStep) {
        this.finished = true;
      }
    }
  }
}

export class RecAudio implements RecAudioData {
  id: number = -1;
  step = -1;
  totalStep = 5;
  finished = false;
  msg = "";
  rawData: any;
  splitData: any;
  constructor(obj: IObj) {
    if (obj) {
      Object.assign(this, mergeProperties(this, obj));
      // 失败获取成功结束
      // 过程中 this.step !== this.totalStep; msg 显示过程信息
      // 过程中失败了 this.step === this.totalStep; msg 显示失败信息
      // 全部完成 this.step === this.totalStep ; finished = true;
      if (this.step === -1) {
        this.step = this.totalStep;
      }
    }
  }
}

export class ImportJson implements ImportData {
  id: string = "";
  data: IObj = {};
  constructor(obj: Partial<ImportData>) {
    if (obj) {
      Object.assign(this, mergeProperties(this, obj));
    }
  }
}
