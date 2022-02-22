# MediaSrt 媒体字幕识别分割生成器(桌面版)

## feature 功能

- 识别音视频中的文字并转译成字幕软件
- 可修正自动转译的文字
- 使用腾讯云识别 API 请得到相关配置
- 使用外置 ffmpeg 与 ffprobe 请配置好全局命令

## template by⚡Vite + Electron & Esbuild Template

This template is used to build vite + electron projects.

**NOTE:** Main process is built with esbuild. After some modifications, it currently supports [`emitDecoratorMetadata`](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata).

### Motivation

In the past, I've been building desktop clients with [vue](https://v3.vuejs.org/) + [vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder), and they work very well. But as the project volume grows, webpack-based build patterns become slower and slower.

The advent of [vite](https://vitejs.dev/) and [esbuild](https://esbuild.github.io/) greatly improved the development experience and made me feel lightning fast ⚡.

It took me a little time to extract this template and thank you for using it.

### How to use

- Click the [Use this template](https://github.com/ArcherGu/fast-vite-electron/generate) button (you must be logged in) or just clone this repo.
- In the project folder:

  ```bash
  # install dependencies
  yarn # npm install

  # run in developer mode
  yarn dev # npm run dev

  # build
  yarn build # npm run build
  ```

### Relative

My blog post:

- [极速 DX Vite + Electron + esbuild](https://archergu.me/posts/vite-electron-esbuild)
- [用装饰器给 Electron 提供一个基础 API 框架](https://archergu.me/posts/electron-decorators)

### global npmrc config for china

```.npmrc
ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/v
ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
```
