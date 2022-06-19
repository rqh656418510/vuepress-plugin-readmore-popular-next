import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { match } from 'node-match-path';
import { initPlugin } from '../components/readmorePlugin'
import { loadJs, loadCss } from "../components/loadResources";
import type { ReadmoreOptions } from "../../shared";

// 初始化插件的配置参数
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
const EXPIRES = options.expires || 365
const TYPE = 'vuepress2'

/**
 * 加载Readmore插件
 */
function loadPlugin() {
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
  // 加载Readmore插件
  else {
    // 获取文章内容的DIV
    var divArr = document.querySelectorAll(SELECTOR);
    if (divArr && divArr.length > 0) {
      // 文章内容DIV设置ID
      divArr[0].id = ID;
      // 加载Readmore插件的CSS文件
      loadCss(CSS_URL, 'readmore-css');
      // 加载Readmore插件的JS文件
      loadJs(LIB_URL, 'readmore-js', () => {
        // 初始化Readmore插件
        initPlugin(ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC, EXPIRES, TYPE);
      }, null)
    } else {
      console.warn('readmore plugin occurred error: not found article content by selector "' + SELECTOR + '"');
    }
  }

}

export const useReadmore = (): void => {

  onMounted(() => {
    const router = useRouter()
    const loadedPages = new Set();

    // 监听路由变化
    router.afterEach((to) => {
      // 解决在极短时间内，重复加载插件导致的性能问题
      if (loadedPages.has(to.fullPath)) {
        setTimeout(() => {
          loadedPages.delete(to.fullPath);
        }, 1000);
      } else {
        loadedPages.add(to.fullPath);
        loadPlugin();
      }
    });

  })

}