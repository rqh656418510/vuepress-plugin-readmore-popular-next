/**
 * 阅读更多插件的配置参数
 */
export interface ReadmoreOptions {

    /**
     * Div 标签的 ID
     */
    id?: string;
    
    /**
     * 博客 ID
     */
    blogId: string;

    /**
     * 微信公众号的名称
     */
    name: string;

    /**
     * 微信公众号的回复关键词
     */
    keyword: string;

    /**
     * 微信公众号的二维码链接
     */
    qrcode: string;

    /**
     * 随机引流的概率
     */
    random?: number;

    /**
     * 是否锁住文章目录
     */
    lockToc?: string;

    /**
     * 文章内容的 JS 选择器
     */
    selector?: string;

    /**
     * 自定义的 JS 资源链接
     */
    libUrl?: string;

    /**
     * 自定义的 CSS 资源链接
     */
    cssUrl?: string;

    /**
     * 文章排除引流的 URL 规则
     */
    excludes?: any;

    /**
     * 是否反转 URL 排除规则
     */
    reverse?: boolean;

    /**
     * 定时校验凭证有效性的时间间隔（秒）
     */
    interval?: number;

    /**
     * 文章解锁后凭证的有效天数
     */
    expires?: number;

    /**
     * 文章内容的预览高度
     */
    height?: string;

    /**
     * 博客的类型
     */
    type?: string;

    /**
     * 后端服务的地址
     */
    baseUrl?: string;
    
    /**
     * 移动端是否启用引流
     */
    allowMobile?: boolean;

}