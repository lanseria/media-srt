declare type CodecType = "audio" | "video";

declare interface UploadMediaData {
  category: CodecType;
  rawPath: string;
  audioPath: string;
  poster: string;
}
