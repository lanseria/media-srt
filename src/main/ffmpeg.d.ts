import * as stream from "stream";

interface FfmpegCommandLogger {
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
  debug(...data: any[]): void;
}

interface FfmpegCommandOptions {
  logger?: FfmpegCommandLogger | undefined;
  niceness?: number | undefined;
  priority?: number | undefined;
  presets?: string | undefined;
  preset?: string | undefined;
  stdoutLines?: number | undefined;
  timeout?: number | undefined;
  source?: string | stream.Readable | undefined;
  cwd?: string | undefined;
}

interface FilterSpecification {
  filter: string;
  inputs?: string | string[] | undefined;
  outputs?: string | string[] | undefined;
  options?: any | string | any[] | undefined;
}

interface Filter {
  description: string;
  input: string;
  multipleInputs: boolean;
  output: string;
  multipleOutputs: boolean;
}
interface Filters {
  [key: string]: Filter;
}
type FiltersCallback = (err: Error, filters: Filters) => void;

interface Codec {
  type: string;
  description: string;
  canDecode: boolean;
  canEncode: boolean;
  drawHorizBand?: boolean | undefined;
  directRendering?: boolean | undefined;
  weirdFrameTruncation?: boolean | undefined;
  intraFrameOnly?: boolean | undefined;
  isLossy?: boolean | undefined;
  isLossless?: boolean | undefined;
}
interface Codecs {
  [key: string]: Codec;
}
type CodecsCallback = (err: Error, codecs: Codecs) => void;

interface Encoder {
  type: string;
  description: string;
  frameMT: boolean;
  sliceMT: boolean;
  experimental: boolean;
  drawHorizBand: boolean;
  directRendering: boolean;
}
interface Encoders {
  [key: string]: Encoder;
}
type EncodersCallback = (err: Error, encoders: Encoders) => void;

interface Format {
  description: string;
  canDemux: boolean;
  canMux: boolean;
}
interface Formats {
  [key: string]: Format;
}
type FormatsCallback = (err: Error, formats: Formats) => void;

interface FfprobeData {
  streams: FfprobeStream[];
  format: FfprobeFormat;
  chapters: any[];
}

declare interface FfprobeStream {
  [key: string]: any;
  index: number;
  codec_name?: string | undefined;
  codec_long_name?: string | undefined;
  profile?: number | undefined;
  codec_type?: string | undefined;
  codec_time_base?: string | undefined;
  codec_tag_string?: string | undefined;
  codec_tag?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  coded_width?: number | undefined;
  coded_height?: number | undefined;
  has_b_frames?: number | undefined;
  sample_aspect_ratio?: string | undefined;
  display_aspect_ratio?: string | undefined;
  pix_fmt?: string | undefined;
  level?: string | undefined;
  color_range?: string | undefined;
  color_space?: string | undefined;
  color_transfer?: string | undefined;
  color_primaries?: string | undefined;
  chroma_location?: string | undefined;
  field_order?: string | undefined;
  timecode?: string | undefined;
  refs?: number | undefined;
  id?: string | undefined;
  r_frame_rate?: string | undefined;
  avg_frame_rate?: string | undefined;
  time_base?: string | undefined;
  start_pts?: number | undefined;
  start_time?: number | undefined;
  duration_ts?: string | undefined;
  duration?: string | undefined;
  bit_rate?: string | undefined;
  max_bit_rate?: string | undefined;
  bits_per_raw_sample?: string | undefined;
  nb_frames?: string | undefined;
  nb_read_frames?: string | undefined;
  nb_read_packets?: string | undefined;
  sample_fmt?: string | undefined;
  sample_rate?: number | undefined;
  channels?: number | undefined;
  channel_layout?: string | undefined;
  bits_per_sample?: number | undefined;
  disposition?: FfprobeStreamDisposition | undefined;
  rotation?: string | number | undefined;
}

interface FfprobeStreamDisposition {
  [key: string]: any;
  default?: number | undefined;
  dub?: number | undefined;
  original?: number | undefined;
  comment?: number | undefined;
  lyrics?: number | undefined;
  karaoke?: number | undefined;
  forced?: number | undefined;
  hearing_impaired?: number | undefined;
  visual_impaired?: number | undefined;
  clean_effects?: number | undefined;
  attached_pic?: number | undefined;
  timed_thumbnails?: number | undefined;
}

interface FfprobeFormat {
  [key: string]: any;
  filename?: string | undefined;
  nb_streams?: number | undefined;
  nb_programs?: number | undefined;
  format_name?: string | undefined;
  format_long_name?: string | undefined;
  start_time?: number | undefined;
  duration?: number | undefined;
  size?: number | undefined;
  bit_rate?: number | undefined;
  probe_score?: number | undefined;
  tags?: Record<string, string | number> | undefined;
}

interface ScreenshotsConfig {
  count?: number | undefined;
  folder?: string | undefined;
  filename?: string | undefined;
  timemarks?: number[] | string[] | undefined;
  timestamps?: number[] | string[] | undefined;
  fastSeek?: boolean | undefined;
  size?: string | undefined;
}

interface AudioVideoFilter {
  filter: string;
  options: string | string[] | {};
}
