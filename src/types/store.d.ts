declare type CodecType = "audio" | "video" | "";

declare interface UploadMediaData {
  uploadId: string;
  category: CodecType;
  rawPath: string;
  audioPath: string;
  poster: string;
}
