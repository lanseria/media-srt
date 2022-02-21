import { EVENTS } from "@common/events";
import { serialize } from "@common/utils";
import { ITransfy } from "@render/db";
import { ipcInstance } from "@render/plugins";
import { retCosOpt } from "./cos";

export const recAudioProcess = async (transfy: ITransfy) => {
  try {
    const config = await retCosOpt();
    const data = serialize({
      config,
      transfy,
    });
    console.log(data);
    ipcInstance.send(EVENTS.REC_AUDIO, data);
  } catch (error: any) {
    throw new Error(error);
  }
};
