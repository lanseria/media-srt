import { BrowserWindow } from "electron";
import { windowConfig } from "./config";
// @ts-ignore
import loadinghtml from "./loading.html";
export let loading: BrowserWindow;
export const showLoading = (cb) => {
  loading = new BrowserWindow({
    show: false,
    resizable: false,
    // transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
    width: 600,
    height: 400,
    center: true,
    frame: false,
    autoHideMenuBar: false,
  });

  loading.once("show", cb);
  loading.loadFile(loadinghtml);
  loading.show();
};
