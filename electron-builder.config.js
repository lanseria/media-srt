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
  electronDownload: {
    mirror: "https://cdn.npmmirror.com/binaries/electron/v",
  },
  files: ["dist/main/**/*", "dist/render/**/*"],
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
};

module.exports = config;
