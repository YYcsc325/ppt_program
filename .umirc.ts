import { defineConfig } from 'umi';

const env: any = process.env.NODE_ENV;

export default defineConfig({
  title: 'ppt_program',
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  publicPath:
    env === 'development' ? './' : 'https://yycsc325.github.io/ppt_program/', // 部署到github上改变script的资源引入路径,
  outputPath: 'build', // umi打包默认打成dist文件， gh-pages构建部署默认路径build
  routes: [{ path: '/', component: '@/pages/index' }],

  /** 全局less变量 */
  theme: {},
  fastRefresh: {},
});
