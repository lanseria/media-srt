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
    mirror: "https://cdn.npmmirror.com/binaries/electron/",
  },
  files: [
    {
      from: "src/to/**/*",
      to: "dist/main/**/*",
    },
    {
      from: "src/render/**/*",
      to: "dist/render/**/*",
    },
  ],
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
};

module.exports = config;
