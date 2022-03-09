import { BrowserWindowConstructorOptions } from "electron";
import * as path from "path";

export const windowConfig: BrowserWindowConstructorOptions = {
  width: 1200,
  minWidth: 1200,
  height: 800,
  minHeight: 800,
  center: true,
  autoHideMenuBar: false,
};
