const symbolZhcn = ["？", "。", "，", "！", "；", "?", ".", ",", "!"];
export const getTextBlock = (text: string): number[] => {
  const blocks: number[] = [];
  const textArr = text.split("");
  for (let i = 0; i < textArr.length; i++) {
    const char = textArr[i];
    if (symbolZhcn.includes(char)) {
      blocks.push(i - blocks.length);
    }
  }
  return blocks;
};

export const getTextBlocks = (text: string): string[] => {
  const blocks: string[] = [];
  const textArr = text.split("");
  let startAt = 0;
  for (let i = 0; i < textArr.length; i++) {
    const char = textArr[i];
    if (symbolZhcn.includes(char)) {
      if (startAt) {
        startAt++;
      }
      const str = text.substring(startAt, i);
      blocks.push(str);
      startAt = i;
    }
  }
  return blocks;
};

export const replaceStrs = (text: string, char = ""): string => {
  for (let i = 0; i < symbolZhcn.length; i++) {
    const oldChar = symbolZhcn[i];
    text = text.replaceAll(oldChar, char);
  }
  return text;
};

export const getRealLength = (val: string) => {
  return [...val].length;
};

export const isChineseChars = (val: string) => {
  const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  return reg.test(val);
};

export const isChineseWords = (wordObjs: any[]) => {
  return wordObjs.some((m) => isChineseChars(m.Word));
};

export const compleSpace = (str: string) => {
  str = str.trim();
  return str + " ";
};

export const repeatStr = (
  str: string,
  s: string,
  length: number,
  before = true
): string => {
  const ln = str.length;

  if (ln >= length) {
    return str;
  }

  if (before) {
    return s.repeat(length - ln) + str;
  } else {
    return str + s.repeat(length - ln);
  }
};

//字幕时间戳转换
function srtTimestamp(seconds: number) {
  let $milliseconds = seconds + 0;

  let $seconds = Math.floor($milliseconds / 1000);
  let $minutes = Math.floor($seconds / 60);
  const $hours = Math.floor($minutes / 60);
  $milliseconds = $milliseconds % 1000;
  $seconds = $seconds % 60;
  $minutes = $minutes % 60;
  return (
    ($hours < 10 ? "0" : "") +
    $hours +
    ":" +
    ($minutes < 10 ? "0" : "") +
    $minutes +
    ":" +
    ($seconds < 10 ? "0" : "") +
    $seconds +
    "," +
    ($milliseconds < 100 ? "0" : "") +
    ($milliseconds < 10 ? "0" : "") +
    $milliseconds
  );
}

export const makeSubtitleText = (
  index: number,
  startTime: number,
  endTime: number,
  text: string,
  isLast = false
) => {
  if (isLast) {
    return `${index}
${srtTimestamp(startTime)} --> ${srtTimestamp(endTime)}
${text}
`;
  }
  const lineStr = `${index}
${srtTimestamp(startTime)} --> ${srtTimestamp(endTime)}
${text}

`;
  return lineStr;
};

export const findSliceIntCount = (slice: number[], target: number) => {
  let c = 0;
  for (let i = 0; i < slice.length; i++) {
    const v = slice[i];
    if (target === v) {
      c++;
    }
  }
  return c;
};
