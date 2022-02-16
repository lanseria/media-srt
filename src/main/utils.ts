import { exec } from "child_process";
import * as path from "path";
import { FfprobeStream } from "./ffmpeg";
export class Ffmpeg {
  static audioOrVideo(streams: FfprobeStream[]): CodecType {
    const firstId = streams.findIndex((m) => m.index === 0);
    const firstStream = streams[firstId];
    if (!firstStream.codec_type) {
      throw new Error("格式错误");
    }
    return firstStream.codec_type as CodecType;
  }
  static getProbeSimple(videoPath: string): Promise<FfprobeStream[]> {
    return new Promise((resolve, reject) => {
      exec(
        `ffprobe -i "${videoPath}" -v quiet -print_format json -show_streams`,
        (err, stdout: string, stderr: string) => {
          if (err) {
            reject({
              err,
              stderr,
            });
          }
          const { streams } = JSON.parse(stdout);
          resolve(streams);
        }
      );
    });
  }
  static videoCover(videoPath: string): Promise<string> {
    const coverPath = `${videoPath}.jpg`;
    return new Promise((resolve, reject) => {
      exec(
        `ffmpeg -i "${videoPath}" -vf "select=eq(pict_type\\,I)" -vf scale=320:180 -frames:v 1 -q:v 1 -pix_fmt yuvj422p -vsync vfr -f image2  ${coverPath} -hide_banner -loglevel error`,
        (err, stdout: string, stderr: string) => {
          if (err) {
            reject(err);
          }
          resolve(coverPath);
        }
      );
    });
  }
  static audioCover(audioPath: string): Promise<string> {
    const coverPath = `${audioPath}.jpg`;
    return new Promise((resolve, reject) => {
      exec(
        `ffmpeg -i "${audioPath}" -an ${coverPath}`,
        (err, stdout: string, stderr: string) => {
          if (err) {
            reject(err);
          }
          resolve(coverPath);
        }
      );
    });
  }

  // static extractVideoAudio(videoPath: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const filename = path.basename(videoPath);
  //     if (!filename) {
  //       throw new Error("错误的文件路径");
  //     }
  //     const audioPath = `${videoPath}.aac`;
  //     ffmpeg
  //       .ffmpeg(videoPath, ["-vn"], audioPath, function (progress: any) {
  //         console.log(progress, "音频分离中");
  //       })
  //       .success(function (json: any) {
  //         console.log(`${audioPath}`, "音频分离成功");
  //         resolve(audioPath);
  //       })
  //       .error(function (error: any) {
  //         reject(error);
  //       });
  //   });
  // }
}
