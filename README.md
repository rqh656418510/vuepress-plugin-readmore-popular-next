## vuepress-plugin-readmore-popular-next

[![npm-image]][npm-url]
[![lic-image]](LICENSE)
![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

> VuePress v2.x 微信公众号引流插件，将免费的公众号引流工具整合到博客中，用户扫码关注公众号后才可以解锁文章，从而将博客流量引流到公众号，达到涨粉丝数的目的。

## 文档

- [官方中文文档](https://docs.techgrow.cn/v2/wechat/vuepress2/)

## 特色功能

- [x] 支持随机为博客添加引流功能
- [x] 支持关闭某篇文章的引流功能
- [x] 支持查询用户解锁文章的历史记录
- [x] 支持自定义 CSS 样式，轻松适配不同风格的博客

## 注册博客

浏览器访问 [TechGrow](https://open.techgrow.cn) 的官网，注册并登录账号后，进入博客的后台管理页面。首先点击左侧的菜单 `博客注册`，然后点击 `新增` 按钮，添加自己博客的信息。博客注册成功后，记录下博客 ID，后面的步骤会使用到

![](https://raw.githubusercontent.com/rqh656418510/vuepress-plugin-readmore-popular-next/main/screenshot/717e14eb59dd44dea62d6a0b7549abfd.png)

## 设置公众号

在微信公众号的后台管理页面，菜单栏里选择 `自动回复` - `关键词回复`，启用 `自动回复`，然后点击 `添加回复` 按钮：

![](https://raw.githubusercontent.com/rqh656418510/vuepress-plugin-readmore-popular-next/main/screenshot/em64p7w8wlqtt0rsjop0jjeywx29m25w.png)

填写 `规则名称`、`关键词（当初你在 TechGrow 中设置的）`、`回复内容` 选择 `文字`，然后 `回复文字` 的内容填写获取博客解锁验证码的链接，如下所示（请自行更改 `xxxxx-xxxxxxxxx-xxx` 为你申请到的博客 ID）

``` html
<a href="https://open.techgrow.cn/#/readmore/captcha/generate?blogId=xxxxx-xxxxxxxxx-xxx">点击链接，获取博客解锁验证码</a>
```

![](https://raw.githubusercontent.com/rqh656418510/vuepress-plugin-readmore-popular-next/main/screenshot/yd89wbdji196ixtwzgzamw37fbein1ia.png)

此时，当读者关注你的微信公众号，并输入关键词后（比如我设置的关键词就是 `tech`），那么读者就会自动接收到获取博客解锁验证码的链接

## 安装插件

> 值得一提的是，插件只支持版本号大于等于 `v2.0.0-beta.48` 的 VuePress，若不满足要求，请务必先手动升级 VuePress 的版本。以插件版本号 `2.0.0-beta.48.x` 举例，其中的 `2.0.0-beta.48` 代表该插件兼容的 VuePress 版本号，而 `x` 则代表插件自身的修订版本号。

- 查看插件所有的版本信息

``` sh
# 查看版本信息
$ npm view vuepress-plugin-readmore-popular-next versions
```

- 运行 `npm install` 命令安装插件到本地博客

``` sh
# 安装最新版本
$ npm install -D vuepress-plugin-readmore-popular-next

# 安装指定版本（推荐）
$ npm install -D vuepress-plugin-readmore-popular-next@2.0.0-beta.48.5
```

## 配置 VuePress

编辑 VuePress 的主配置文件（例如 `.vuepress/config.ts`），新增插件的配置信息（请自行更改博客相关的信息），如下所示：

``` js
const { readmorePlugin } = require('vuepress-plugin-readmore-popular-next')

module.exports = {
  plugins: [
    readmorePlugin({
      // 已申请的博客 ID
      blogId: '18762-1609305354821-257',
      // 已申请的微信公众号名称
      name: '全栈技术驿站',
      // 已申请的微信公众号回复关键词
      keyword: 'Tech',                    
      // 已申请的微信公众号二维码链接
      qrcode: 'https://www.techgrow.cn/img/wx_mp_qr.png',
      // 文章内容的 JS 选择器，若使用的不是官方默认主题，则需要根据第三方的主题来设置
      selector: 'div.theme-default-content',
      // 自定义的 JS 资源链接，可用于 CDN 加速
      libUrl: 'https://qiniu.techgrow.cn/readmore/dist/readmore.js',
      // 自定义的 CSS 资源链接，可用于适配不同风格的博客
      cssUrl: 'https://qiniu.techgrow.cn/readmore/dist/vuepress2.css',
      // 文章排除添加引流工具的 URL 规则，支持使用路径、通配符、正则表达式的匹配规则
      excludes: { strExp: [], regExp: [] },
      // 是否反转 URL 排除规则的配置，即只有符合排除规则的文章才会添加引流工具
      reverse: false,
      // 文章解锁后凭证的有效天数
      expires: 365,
      // 定时校验凭证有效性的时间间隔（秒）
      interval: 60,
      // 每篇文章随机添加引流工具的概率，有效范围在 0.1 ~ 1 之间，1 则表示所有文章默认都自动添加引流工具
      random: 1
    })
  ]
}
```

## 插件参数说明

| 参数     | 类型        | 必填 | 默认值                                               | 说明 |
| -------- | ----------- | ---- | ---------------------------------------------------- | ---- |
| blogId   | String      | 是   | 无                                                   | -    |
| name     | String      | 是   | 无                                                   | -    |
| keyword  | String      | 是   | 无                                                   | -    |
| qrcode   | String      | 是   | 无                                                   | -    |
| selector | String      | 否   | `div.theme-default-content`                          | -    |
| libUrl   | String      | 否   | https://qiniu.techgrow.cn/readmore/dist/readmore.js  | -    |
| cssUrl   | String      | 否   | https://qiniu.techgrow.cn/readmore/dist/vuepress.css | -    |
| excludes | Json Object | 否   | `{ strExp: [ ], regExp: [ ] }`                       | -    |
| reverse  | Boolean     | 否   | `false`                                              | -    |
| expires  | Number      | 否   | `365`                                                | -    |
| interval | Number      | 否   | `60`                                                 | -    |
| random   | Number      | 否   | `1`                                                  | -    |

`selector` 参数的作用是指定 JS 选择器来获取文章的主体内容，若 VuePress 使用了第三方主题，则一般需要根据第三方主题来配置该参数，否则可能会导致引流工具无法生效。其中 VuePress 不同主题的配置示例如下：

| 主题                                                                                              | 插件配置                                | 备注         |
| ------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------ |
| [@vuepress/theme-vue](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/theme-vue) | `selector: 'div.theme-default-content'` | 官方默认主题 |
| [vuepress-theme-reco](https://github.com/vuepress-reco/vuepress-theme-reco-1.x)                   | `selector: 'div.theme-reco-content'`    | 第三方主题   |

> 若不清楚如何指定 JS 选择器，则可以打开博客的任意一篇文章，利用 Chrome 等浏览器的元素审查功能，找到文章页面中文章主体的 `div` 标签，最后定位得到 `div` 标签的 CSS 类即可（例如 `theme-default-content`），如下图所示。

![](https://raw.githubusercontent.com/rqh656418510/vuepress-plugin-readmore-popular-next/main/screenshot/ggmr7dg23fjj3mqndyays04ok93adj3n.png)

## 验证插件效果

打开文章页面，若文章自动隐藏了部分内容，并且出现了 `阅读全文` 按钮，则说明引流插件正常运行，如下图所示：

![](https://raw.githubusercontent.com/rqh656418510/vuepress-plugin-readmore-popular-next/main/screenshot/g7v4su56sx5g95qipmzh0k1hknj6fsa7.png)

点击 `阅读全文按钮`，会弹出微信公众号的二维码窗口，如下图所示：

![](https://raw.githubusercontent.com/rqh656418510/vuepress-plugin-readmore-popular-next/main/screenshot/77o3g5fhjovtu725vm8z42lemqt8zwli.png)

## 取消阅读限制

若希望关闭部分文章的微信公众号引流功能，可以使用插件的 `excludes` 参数来实现。值得一提的是，`excludes` 的参数值是一个 JSON 对象，其中的 `strExp` 属性是路径和通配符规则的字符串数组，而 `regExp` 属性是正则表达式的字符串数组。

- 根据 URL 路径，关闭某篇文章的引流功能

``` js
module.exports = {
  plugins: [
    readmorePlugin({
      // 排除 URL 为 `/fontend/webpack` 的文章
      excludes: { strExp: ['/fontend/webpack'] },    
    })
  ]
}
```

- 根据 URL 通配符，关闭某个目录下的所有文章的引流功能

``` js
module.exports = {
  plugins: [
    readmorePlugin({
      // 排除 URL 以 `/fontend` 开头的文章
      // 排除 URL 为 `/backend/python/io` 的文章
      excludes: { strExp: ['/fontend/*', '/backend/*/io'] },
    })
  ]
}
```

- 根据 URL 正则表达式，关闭符合规则的所有文章的引流功能


``` js
module.exports = {
  plugins: [
    readmorePlugin({
      // 排除 URL 不以 `/fontend` 开头的文章
      excludes: { regExp: ['^(?!\/fontend).*'] },
    })
  ]
}
```

- 混合使用

``` js
module.exports = {
  plugins: [
    readmorePlugin({
      excludes: { strExp: ['/webpack', '/fontend/*', '/backend/*/io'], regExp: ['^(?!\/php).*'] },
    })
  ]
}
```

- 文章 URL 优先匹配 `strExp` 规则，然后再匹配 `regExp` 规则
- 文章 URL 一旦满足 `strExp` 规则，则不会再匹配 `regExp` 规则
- 如果希望符合 URL 排除规则的文章才添加引流工具，则可以使用 `reverse : true` 配置参数实现

## 自定义样式

插件默认使用了定义在 [vuepress2.css](https://qiniu.techgrow.cn/readmore/dist/vuepress2.css) 的 CSS 样式，你可以使用以下两种方式自定义自己的样式：

- 第一种方式：更改博客主题的 CSS 源码文件，将自定义的那部分 CSS 样式添加到里面
- 第二种方式：根据 [vuepress2.css](https://qiniu.techgrow.cn/readmore/dist/vuepress2.css) 创建自己的 CSS 文件（完整的），并将其存放在自己的博客里，同时通过插件的 `cssUrl` 配置参数来指定其访问的 URL 路径

> 提示：为了方便日后维护，强烈建议使用第二种方式来添加自定义样式

## 常见问题

- [VuePress v2.x 引流问题](https://docs.techgrow.cn/v2/wechat/vuepress2/#常见问题)

## 周边生态

- [Hexo 引流插件](https://github.com/rqh656418510/hexo-readmore)
- [VuePress v1.x 引流插件](https://github.com/rqh656418510/vuepress-plugin-readmore-popular)

## 开发计划

- [ ] 支持博客的 UV、PV 统计
- [ ] 在博客的后台管理界面中，支持博客浏览量的图表分析

## 官方微信群

- [微信群二维码](https://www.techgrow.cn/img/wx-group-qr-techgrow.png)

## License

Released under the MIT License

[npm-image]: https://img.shields.io/npm/v/vuepress-plugin-readmore-popular-next?style=flat-square
[lic-image]: https://img.shields.io/npm/l/vuepress-plugin-readmore-popular-next?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/rqh656418510/vuepress-plugin-readmore-popular-next?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/vuepress-plugin-readmore-popular-next?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/vuepress-plugin-readmore-popular-next?style=flat-square

[npm-url]: https://www.npmjs.com/package/vuepress-plugin-readmore-popular-next