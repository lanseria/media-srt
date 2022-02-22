import { promises } from "fs";

export const writeFile = promises.writeFile;
export const readFile = promises.readFile;

export const writeJson = async (filepath: string, data: IObj) => {
  try {
    await promises.writeFile(filepath, JSON.stringify(data, null, 2), {});
  } catch (error: any) {
    throw new Error(error);
  }
};
