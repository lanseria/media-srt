export const EngineModel = {
  '16k_zh': '16k中文普通话通用',
  '16k_zh_video': '16k音视频领域',
  '16k_en': '16k英语',
  '16k_ca': '16k粤语',
  '16k_ja': '16k日语',
  '16k_zh_edu': '16k中文教育',
  '16k_en_edu': '16k英文教育',
  '16k_zh_medical': '16k医疗',
  '16k_th': '16k泰语',
  '16k_wuu-SH': '16k上海话方言',
  '16k_zh_dialect': '16k多方言',
};
export type EngineModelType = typeof EngineModel;
export type EngineModelKeyType = keyof EngineModelType;

export const TransfyCategory = {
  video: '视频字幕',
  audio: '音频字幕',
  translation: '字幕翻译',
};

export type TransfyCategoryType = typeof TransfyCategory;
export type TransfyCategoryKeyType = keyof TransfyCategoryType;

export const TransfyStatus = {
  to_be_identifying: '待识别',
  identifying: '识别中',
  identify_failed: '识别失败',
  to_be_proofread: '待校对',
  proofread: '校对过',
};

export type TransfyStatusType = typeof TransfyStatus;
export type TransfyStatusKeyType = keyof TransfyStatusType;
