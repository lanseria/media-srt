import { exec } from "child_process";
import { FfprobeStream } from "fluent-ffmpeg";
export class Ffmpeg {
  /**
   * 分析文件是视频还是音频
   * @param streams ffmpeg 流
   * @returns {CodecType}
   */
  static audioOrVideo(streams: FfprobeStream[]): CodecType {
    const firstId = streams.findIndex((m) => m.index === 0);
    const firstStream = streams[firstId];
    if (!firstStream.codec_type) {
      throw new Error("格式错误");
    }
    return firstStream.codec_type as CodecType;
  }
  /**
   * 获取媒体信息
   * @param mediaPath 媒体路径
   * @returns 返回 ffmpeg 流
   */
  static readMediaProbe(mediaPath: string): Promise<FfprobeStream[]> {
    return new Promise((resolve, reject) => {
      exec(
        `ffprobe -i "${mediaPath}" -v quiet -print_format json -show_streams`,
        (err, stdout: string) => {
          if (err) {
            reject(err);
          }
          const { streams } = JSON.parse(stdout);
          resolve(streams);
        }
      );
    });
  }
  /**
   * 分析出视频中的合适封面
   * @param videoPath 视频文件路径
   * @returns 图片路径
   */
  static videoCover(videoPath: string): Promise<string> {
    const coverPath = `${videoPath}.jpg`;
    return new Promise((resolve, reject) => {
      exec(
        `ffmpeg -y -i "${videoPath}" -vf "select=eq(pict_type\\,I)" -vf scale=320:180 -frames:v 1 -q:v 1 -pix_fmt yuvj422p -vsync vfr -f image2  "${coverPath}" -hide_banner -loglevel error`,
        (err) => {
          if (err) {
            reject(err);
          }
          resolve(coverPath);
        }
      );
    });
  }
  /**
   * 分离音频文件中的封面
   * @param audioPath 音频文件路径
   * @returns 图片路径
   */
  static audioCover(audioPath: string): Promise<string> {
    const coverPath = `${audioPath}.jpg`;
    return new Promise((resolve, reject) => {
      exec(
        `ffmpeg -y -i "${audioPath}" -an "${coverPath}"`,
        (err, stdout: string, stderr: string) => {
          if (err) {
            reject(err);
          }
          resolve(coverPath);
        }
      );
    });
  }
  /**
   * 分离视频中的音频
   * @param videoPath 视频路径
   * @returns 音频路径
   */
  static extractAudioFromVideo(videoPath: string): Promise<string> {
    const audioPath = `${videoPath}.aac`;
    return new Promise((resolve, reject) => {
      exec(
        `ffmpeg -y -i "${videoPath}" -vn "${audioPath}"`,
        (err, stdout: string, stderr: string) => {
          if (err) {
            reject(err);
          }
          resolve(audioPath);
        }
      );
    });
  }
}
