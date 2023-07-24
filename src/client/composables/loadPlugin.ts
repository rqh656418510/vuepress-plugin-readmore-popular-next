import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { match } from 'node-match-path';

import { setup } from '../components/setupPlugin.js'
import { loadJs, loadCss } from "../components/loadResources.js";
import type { ReadmoreOptions } from "../../shared/index.js";

// 引流插件的配置参数
declare const __READMORE_OPTIONS__: ReadmoreOptions;
const options = __READMORE_OPTIONS__;
const ID = options.id || 'readmore-container'
const BLOG_ID = options.blogId || ''
const NAME = options.name || ''
const KEYWORD = options.keyword || ''
const QR_CODE = options.qrcode || ''
const RANDOM = options.random || 1
const LOCK_TOC = options.lockToc || 'yes'
const SELECTOR = options.selector || 'div.theme-default-content'
const LIB_URL = options.libUrl || 'https://qiniu.techgrow.cn/readmore/dist/readmore.js'
const CSS_URL = options.cssUrl || 'https://qiniu.techgrow.cn/readmore/dist/vuepress.css'
const EXCLUDES = options.excludes || { strExp: [], regExp: [] }
const REVERSE = options.reverse || false
const INTERVAL = options.interval || 60
const EXPIRES = options.expires || 365
const HEIGHT = options.height || 'auto'
const TYPE = 'vuepress2'
const BASEURL = options.baseUrl || ''
const ALLOW_MOBILE = options.allowMobile || false

// 使用引流插件
export const useReadmorePlugin = (): void => {

  onMounted(() => {
    // 加载引流插件
    loadReadmorePlugin(1000);

    // 监听路由变化
    const router = useRouter();
    router.afterEach((to, from) => {
      var toPath = to.path;
      var fromPath = from.path;
      // 忽略带锚点的路由变化
      if (toPath != fromPath) {
        // 重新加载引流插件
        loadReadmorePlugin(500);
      }
    });

  })

}

/**
 * 
 * 加载引流插件
 */
function loadReadmorePlugin(waitMills: number) {
  // 利用定时器来保证可以正常操作DOM节点
  setTimeout(() => {
    updateReadmorePlugin();
  }, waitMills);
};

/**
 * 更新引流插件
 */
function updateReadmorePlugin() {
  // 排除指定的文章链接
  var path = window.location.pathname;
  var strExp = EXCLUDES.strExp;
  var regExp = EXCLUDES.regExp;
  var isExcluded = false;

  // 路径 + 通配符规则匹配
  if (strExp && strExp.length > 0) {
    for (var i = 0; i < strExp.length; i++) {
      if (match(strExp[i], path).matches) {
        isExcluded = true;
        break;
      }
    }
  }

  // 正则表达式匹配
  if (regExp && regExp.length > 0 && !isExcluded) {
    for (var i = 0; i < regExp.length; i++) {
      // 创建正则表达式
      var newExp = new RegExp(regExp[i], 'gi');
      if (match(newExp, path).matches) {
        isExcluded = true;
        break;
      }
    }
  }

  // 应用排除规则
  if (isExcluded && !REVERSE) {
    return;
  }
  // 反转排除配规则
  else if (!isExcluded && REVERSE) {
    return;
  }
  // 更新引流插件
  else {
    // 获取文章内容的DIV
    var divArr = document.querySelectorAll(SELECTOR);
    if (divArr && divArr.length > 0) {
      // 文章内容DIV设置ID
      divArr[0].id = ID;
      // 加载引流插件的CSS文件
      loadCss(CSS_URL, 'readmore-css');
      // 加载引流插件的JS文件
      loadJs(LIB_URL, 'readmore-js', () => {
        // 安装引流插件
        setup(ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC, INTERVAL, EXPIRES, HEIGHT, TYPE, BASEURL, ALLOW_MOBILE);
      }, null);
    } else {
      console.warn('readmore plugin occurred error: not found article content by selector "' + SELECTOR + '"');
    }
  }

}
