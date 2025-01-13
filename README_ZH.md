# 拼多多风格新年祝福(hpy-pdd)

[中文](README_ZH.md) | [English](README.md)

[Github 仓库地址](https://github.com/beijiushare/hpy-pdd)
[Gitee 仓库地址](https://gitee.com/beijiushare/hpy-pdd)

## 介绍

这是一款基于 Vue.js 的拼多多风格新年祝福项目。向您说明以下几点：

- 项目使用 [MIT 开源协议](LICENSE)，这意味着您可以任意地使用、修改、分发该项目代码。
- 由于开发能力限制及使用场景考虑，项目仅支持在 `移动端` 查看，未考虑 `PC端` 适配。
- 这是我的第一个 `Vue.js` 项目,第一次使用 `TypeScript` ,甚至是第一次制作 web 动画,项目管理混乱(也许压根没有),制作粗糙,还请见谅.
- 尽管我的最初目标是用纯粹的`CSS+TS+静态图片`制作动画来复刻拼多多风格,但很快我发现这相当困难复杂,工程量巨~~~大.所以最后还是使用了两个 gif(`宝箱开盒`与`星星`),也许我该学习一下`用AE制作动画`或者找一位`设计小伙伴`[捂脸 🤦😵‍💫],听说[`lottie`](https://gw.alipayobjects.com/mdn/rms_04f0aa/afts/img/A*ZPyTSLUvGEsAAAAAAAAAAABjARQnAQ)相当不错.
- 添加一个抽奖拼盘也许会使风格好歹接近 pdd 点,这会在后续版本中添加.
- 如果你愿意,麻烦为本项目点个 `star⭐` 鼓励一下,谢谢!

## 项目预览

[在线预览地址](https://pdd-zhufu.netlify.app/)

## 本地化构建

### 前置条件

- Node.js
- npm
- vue-vite

### 安装依赖

安装项目所需的依赖包。

```sh
npm install
```

### 启动开发服务器

启动开发服务器，进行编译并开启热重载功能，方便在开发过程中实时预览代码更改。

```sh
npm run dev
```

### 构建

对项目进行类型检查，编译代码，并进行压缩优化，生成可用于生产的构建文件。

```sh
npm run build
```

然后将 `dist` 文件夹下的内容部署到服务器即可。

## 采用了以下网络资源

- 代码:打开红包后绽放烟花的效果直接使用了一篇[博客](https://blog.csdn.net/wrz2018/article/details/135275742)的内容,并进行了部分更改,暂时不知道该代码是否可以使用,故将在后续版本中删除该部分代码,自己重写.
- 音效
  - `数钞机` 来自[耳聆网](https://www.ear0.com/)
  - `烟花` 来自[耳聆网](https://www.ear0.com/)
- 音乐：Hamili - Lunary (Vlog No Copyright Music) 厂牌：Vlog No Copyright Music
  地址：https://www.youtube.com/watch?v=pUUxWCmW7xg
