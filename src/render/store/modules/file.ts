import { UploadMedia } from "@common/dto";
import { defineStore } from "pinia";

interface FileState {
  uploadMediaData: Nullable<UploadMediaData>;
}

export const useFileStore = defineStore({
  id: "file",
  state: (): FileState => ({
    uploadMediaData: null,
  }),
  actions: {
    initUploadMediaData(id: string) {
      this.uploadMediaData = new UploadMedia({
        uploadId: id,
      });
    },
    overrideUploadMediaData(data: UploadMediaData) {
      this.uploadMediaData = data;
    },
  },
});
