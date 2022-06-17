/**
 * 加载外部js文件
 * 
 * @param url 导入js的url地址
 * @param id  script标签的id（必须唯一）
 * @param success 加载成功的回调函数
 * @param error 加载失败的回调函数
 * @returns {*} export此函数方便全局调用
 */
export function loadJs(url: string, id: string, success: any, error: any) {
    let srcArr = document.getElementsByTagName('script');
    for (let i = 0; i < srcArr.length; i++) {
        // 如果找到了重复的js标签将它删除
        if (srcArr[i].id === id) {
            var element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        }
    }

    // 创建script标签，并为此标签添加id
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = id;

    // 添加标签到body尾部
    document.body.appendChild(script);

    // 处理回调函数
    script.onload = () => {
        if (success && typeof success === 'function') {
            success();
        }
    };
    script.onerror = () => {
        if (error && typeof error === 'function') {
            error();
        }
    }
}

/**
 *
 * 加载外部css文件
 * 
 * @param url 导入css的url地址
 * @param id  link标签的id（必须唯一）
 * @returns {*} export此函数方便全局调用
 */
export function loadCss(url: string, id: string) {
    let linkArr = document.getElementsByTagName('link');
    for (let i = 0; i < linkArr.length; i++) {
        // 如果找到了重复的link标签将它删除
        if (linkArr[i].id === id) {
            var element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        }
    }

    // 创建link标签，并为此标签添加id
    let link = document.createElement('link');
    link.id = id;
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';

    // 添加标签到头部
    document.head.appendChild(link);
}

/**
 * 添加js代码块
 * 
 * @param code js代码（字符串）
 * @param id  script标签的id（必须唯一）
 * @returns {*} export此函数方便全局调用
 */
export function insertJsCode(code: string, id: string) {
    let srcArr = document.getElementsByTagName('script');
    for (let i = 0; i < srcArr.length; i++) {
        // 如果找到了重复的js标签将它删除
        if (srcArr[i].id === id) {
            var element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        }
    }

    // 创建script标签，并为此标签添加id
    let newScript = document.createElement("script");
    newScript.type = 'text/javascript';
    newScript.id = id;

    // 往script标签内添加js代码
    let inlineScript = document.createTextNode(code);
    newScript.appendChild(inlineScript);

    // 添加标签到body尾部
    document.body.appendChild(newScript);
}
