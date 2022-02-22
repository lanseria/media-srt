import { dialog } from "electron";
import * as os from "os";
import * as path from "path";
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
      properties: ["openFile", "showHiddenFiles"],
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

  onSaveFile(title: string, filePath: string) {
    return dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath: path.join(os.homedir(), filePath),
    });
  }

  onOpenJsonFile() {
    return dialog.showOpenDialog(mainWindow, {
      title: "导入数据",
      properties: ["openFile", "showHiddenFiles"],
      message: "打开JSON",
      filters: [
        {
          name: "json",
          extensions: ["json"],
        },
      ],
    });
  }

  // onOpenFolder() {
  //   throw new Error("Method not implemented.");
  // }
}

FileService.instance = null;
