import { dialog } from "electron";
import { Injectable } from "../decorators";
import { mainWindow } from "../index";

@Injectable("FileService")
export class FileService {
  static instance: any;
  constructor() {
    if (FileService.instance) {
      return FileService.instance;
    }
    FileService.instance = this;
  }

  public init() {
    this.onOpenFile();
    // this.onOpenFolder();
    // this.reg =
    //   /\.(MP4|WebM|Ogg|mkv|avi|MOV|ASF|WMV|NAVI|3GP|FLV|F4V|RMVB|HDDVD|rm|rmvb|mp3)$/i;
  }
  onOpenFile() {
    return dialog.showOpenDialog(mainWindow, {
      title: "打开文件",
      properties: ["openFile", "showHiddenFiles", "createDirectory"],
      message: "打开媒体文件",
      filters: [
        {
          name: "media",
          extensions: [
            "MP4",
            "WebM",
            "Ogg",
            "mkv",
            "avi",
            "MOV",
            "ASF",
            "WMV",
            "NAVI",
            "3GP",
            "FLV",
            "F4V",
            "RMVB",
            "HDDVD",
            "rm",
            "rmvb",
            "MP3",
            "flac",
          ],
        },
      ],
    });
  }

  // onOpenFolder() {
  //   throw new Error("Method not implemented.");
  // }
}

FileService.instance = null;
