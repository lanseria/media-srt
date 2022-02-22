declare type CodecType = "audio" | "video" | "";

declare interface UploadMediaData {
  uploadId: string;
  category: CodecType;
  rawPath: string;
  audioPath: string;
  poster: string;
  step: number;
  totalStep: number;
  finished: boolean;
  msg: string;
}
declare interface ImportData {
  id: string;
  data: string;
}

declare interface RecAudioData {
  id: number;
  step: number;
  totalStep: number;
  finished: boolean;
  msg: string;
  rawData: any;
  splitData: any;
}

declare interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
}

declare interface StoredFile extends HasFile, StoredFileMetadata {}

declare interface HasFile {
  file: Buffer | string;
}
declare interface StoredFileMetadata {
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}

declare type AppMimeType = "image/png" | "image/jpeg";
declare interface TencentOpt {
  SecretId: string;
  SecretKey: string;
  Bucket: string;
  Region: string;
}
declare interface SliceItem {
  FinalSentence: string;
  StartMs: number;
  EndMs: number;
}

declare interface SubtitlesItem extends SliceItem {
  id: number;
}
