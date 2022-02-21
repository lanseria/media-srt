import {
  SentenceDetail,
  SentenceWords,
  TaskStatus,
} from "tencentcloud-sdk-nodejs/tencentcloud/services/asr/v20190614/asr_models";
import {
  getTextBlock,
  getTextBlocks,
  makeSubtitleText,
  replaceStrs,
} from "./str";

interface FormatSliceItem {
  FinalSentence: string;
  FormatText: string;
  StartMs: number;
  EndMs: number;
  Blocks: number[];
  TextBlocks: string[];
  IsEmptyBlock: boolean;
  Words: SentenceWords[];
}

export class Subtitles {
  private rawData: TaskStatus;
  private sliceData: SliceItem[];
  constructor(rawData: TaskStatus) {
    this.rawData = rawData;
    this.sliceData = [];
  }

  fillSliceData(Row: SliceItem) {
    this.sliceData.push(Row);
  }

  formatPg(Pg: SentenceDetail): FormatSliceItem {
    const FormatText = replaceStrs(Pg.FinalSentence);
    const Blocks = getTextBlock(Pg.FinalSentence);
    const TextBlocks = getTextBlocks(Pg.FinalSentence);
    const IsEmptyBlock = [0, 1].includes(Blocks.length);
    return {
      ...Pg,
      FormatText,
      Blocks,
      TextBlocks,
      IsEmptyBlock,
    };
  }

  useBlockFindLastWord(Fpg: FormatSliceItem, Words: SentenceWords[]) {
    for (let i = 0; i < Fpg.Blocks.length; i++) {
      let w: SentenceWords | undefined;
      let first = true;
      let blockBeginTime = Fpg.StartMs;
      const text = Fpg.TextBlocks[i];
      while ((w = Words.shift())) {
        if (first) {
          first = false;
          blockBeginTime = blockBeginTime + w.OffsetStartMs;
          // console.log(w.Word.trim(), w.OffsetStartMs);
        }
        if (text.endsWith(w.Word.trim())) {
          this.fillSliceData({
            FinalSentence: text,
            StartMs: blockBeginTime,
            EndMs: Fpg.StartMs + w.OffsetEndMs,
          });
          // console.log(w.Word.trim(), w.OffsetEndMs);
          first = true;
          // 移除多余标点符号
          Words.shift();
          break;
        }
      }
    }
  }

  anylsisPg(Pg: SentenceDetail) {
    const FormatPg = this.formatPg(Pg);
    if (FormatPg.IsEmptyBlock) {
      this.fillSliceData({
        FinalSentence: FormatPg.FinalSentence,
        StartMs: FormatPg.StartMs,
        EndMs: FormatPg.EndMs,
      });
    } else {
      const { Words } = FormatPg;
      this.useBlockFindLastWord(FormatPg, Words);
    }
  }

  buildSliceData() {
    const ResultDetail = this.rawData.ResultDetail;
    ResultDetail.forEach((Pg) => {
      this.anylsisPg(Pg);
    });
    return this.sliceData;
  }

  buildFile() {
    // 生成 Srt 文件
    let index = 0;
    let srtText = "";
    this.sliceData.forEach((m, i) => {
      const lineStr = makeSubtitleText(
        index,
        m.StartMs,
        m.EndMs,
        m.FinalSentence,
        i + 1 === this.sliceData.length
      );
      srtText += lineStr;
      index++;
    });
    return srtText;
  }
}
