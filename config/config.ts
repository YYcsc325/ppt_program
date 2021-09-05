import { defineConfig } from 'umi';
import path from 'path';
import theme from './theme';
// import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
const target = 'http://localhost:8000';
const env: any = process.env.NODE_ENV;

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
 * @params fastRefresh 快速更新页面
 */

export default defineConfig({
  theme,
  hash: true,
  title: 'inforgram',
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  targets: {
    ie: 11,
  },
  alias: {
    '~': path.resolve(__dirname, '..', 'src'),
  },
  locale: {
    default: 'zh-CN',
  },
  favicon: 'https://cdn.jifo.co/favicon/favicon-32x32.png',
  metas: [{ name: 'description', content: 'Welcome come to inforgram' }],
  routes: [{ path: '/', component: '@/pages/home' }],
  history: {
    type: 'hash',
  },
  publicPath: './',
  // publicPath:
  //   env === 'development' ? './' : 'https://yycsc325.github.io/ppt_program/', // 部署到github上改变script的资源引入路径
  // outputPath: 'build', // umi打包默认打成dist文件， gh-pages构建部署默认路径build
  proxy: {
    '/dt': {
      target,
      changeOrigin: true,
      pathRewrite: { '^/dt': '' },
    },
  },

  // fastRefresh: {},
  // base: "/docs/",
  // publicPath: "/static/",
  // ctoken: true,
  // chainWebpack(chain) {
  //   chain.plugin('sensitive').use(CaseSensitivePathsWebpackPlugin, []);
  // },
});
