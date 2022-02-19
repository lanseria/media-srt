import { BrowserWindow } from "electron";
import which from "which";
// @ts-ignore
import loadinghtml from "./loading.html";
export let loading: BrowserWindow;
export const loadingStatus = {
  cmdCheck: false,
  cmdCheckReasons: "",
};
export const showLoading = (cb) => {
  loading = new BrowserWindow({
    show: false,
    resizable: false,
    // transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
    width: 600,
    height: 400,
    center: true,
    frame: true,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
    },
  });

  loading.once("show", cb);
  // loading.webContents.send('check-ffmpeg')
  Promise.allSettled(["ffprobe", "ffmpeg"].map((cmd) => which(cmd))).then(
    (results) => {
      const isPass = results.every((r) => r.status === "fulfilled");
      if (!isPass) {
        const reasons = (
          results.filter(
            (m) => m.status === "rejected"
          ) as PromiseRejectedResult[]
        ).map((m) => m.reason);
        // console.log(reasons);
        loadingStatus.cmdCheck = false;
        const HELP_URL = "https://evermeet.cx/ffmpeg/";
        reasons.push(`you can find at: ${HELP_URL}`);
        loadingStatus.cmdCheckReasons = reasons.join("\n");
      } else {
        loadingStatus.cmdCheck = true;
      }
    }
  );
  loading.loadFile(loadinghtml);
  loading.show();
};
