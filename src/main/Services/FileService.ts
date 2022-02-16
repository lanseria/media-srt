import { EVENTS } from "@common/events";
import { Ffmpeg } from "@main/utils";
import { ipcMain, dialog } from "electron";
import { Injectable } from "../decorators";
import { mainWindow } from "../index";
@Injectable("FileService")
export class FileService {
  static instance: any;
  count: number;
  reg: RegExp;
  constructor() {
    if (FileService.instance) {
      return FileService.instance;
    }
    this.count = 0;
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

  async readMediaProbe(filePath) {
    try {
      return await Ffmpeg.getProbeSimple(filePath);
    } catch (error) {
      console.log(error);
    }
  }

  audioOrVideo = Ffmpeg.audioOrVideo;
  async videoCover(filePath) {
    try {
      return await Ffmpeg.videoCover(filePath);
    } catch (error) {
      console.log(error);
    }
  }
  async audioCover(filePath) {
    try {
      return await Ffmpeg.audioCover(filePath);
    } catch (error) {
      console.log(error);
    }
  }
}

FileService.instance = null;
