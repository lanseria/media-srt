import { defineStore } from "pinia";

interface FileState {
  uploadMediaFileDataList: UploadMediaData[];
}

export const useFileStore = defineStore({
  id: "file",
  state: (): FileState => ({
    uploadMediaFileDataList: [],
  }),
  actions: {
    findIndex(id: string) {
      return this.uploadMediaFileDataList.findIndex((m) => m.uploadId === id);
    },
    initUploadMediaData(id: string) {
      if (this.findIndex(id) >= 0) {
        return;
      }
      this.uploadMediaFileDataList.push({
        uploadId: id,
        rawPath: "",
        poster: "",
        category: "",
        audioPath: "",
      });
    },
    overrideUploadMediaData(data: UploadMediaData) {
      const idx = this.findIndex(data.uploadId);
      this.uploadMediaFileDataList[idx] = data;
    },
  },
});
