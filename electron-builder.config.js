const mirror =
  process.env.ELECTRON_MIRROR ?? "https://npmmirror.com/mirrors/electron/";
const { version } = require("./package.json");
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: "dist/electron",
  },
  npmRebuild: false,
  buildDependenciesFromSource: true,
  files: ["dist/main/**/*", "dist/render/**/*"],
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
  electronDownload: {
    mirror,
    customDir: `v${version}`,
  },
};

module.exports = config;
