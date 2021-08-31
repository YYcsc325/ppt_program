import { defineConfig } from 'umi';
import path from 'path';
// import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
const target = 'http://localhost:8000';

/**
 * @params base 打包路径  base: "/docs"
 * @params hash 开启hash模式  hash: true 指的是css，js文件
 * @params history 路由是否开启hash build不开启hash会丢失history报错
 * @params alias 对项目引用路径取别名
 * @params title 浏览器上的展示标题
 * @params favicon 浏览器上展示的icon
 * @params metas 对网页的描述，有利于搜索引擎爬取数据
 * @params routes 路由配置
 * @params targets 兼容浏览器
 * @params publicPath 资源访问路径
 */

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  publicPath: './',
  hash: true,
  targets: {
    ie: 11,
  },
  alias: {
    '~': path.resolve(__dirname, '..', 'src'),
  },
  locale: {
    default: 'zh-CN',
  },
  title: 'inforgram',
  favicon: 'https://cdn.jifo.co/favicon/favicon-32x32.png',
  metas: [{ name: 'description', content: 'Welcome come to inforgram' }],
  routes: [
    { path: '/', component: '@/pages/index' },
    { component: '@/pages/404' },
  ],

  history: {
    type: 'hash',
  },
  proxy: {
    '/dt': {
      target,
      changeOrigin: true,
      pathRewrite: { '^/dt': '' },
    },
  },

  // base: "/docs/",
  // publicPath: "/static/",
  // ctoken: true,
  // chainWebpack(chain) {
  //   chain.plugin('sensitive').use(CaseSensitivePathsWebpackPlugin, []);
  // },
});
