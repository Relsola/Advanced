import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from "@vitejs/plugin-vue-jsx"
import { visualizer } from 'rollup-plugin-visualizer';
import ViteRestart from 'vite-plugin-restart';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import autoprefixer from 'autoprefixer';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';

const variablePath = normalizePath(resolve('./src/style.less'));


/* 
  其他常用插件
  vitejs-plugin-legacy  为不支持原生ESM的传统浏览器提供支持
  @vitejs/plugin-vue  vite支持vue开发
  vite-plugin-vue-images  自动导入图像，同级目录的文件名不能重复
  vue-global-api  解决unplugin-auto-import的自动导入导致的eslint报错
*/

export default defineConfig({
  plugins: [
    // vue语法
    vue(),

    // vue3setup语法糖支持name属性 (keep-alive的时候需要用到name)
    vueSetupExtend(),

    // jsx语法
    vuejsx(),

    // 语法校验
    // viteEslint(),
    // viteStylelint(),

    // 打包分析 在根目录下生成一个 stats.html文件
    visualizer(),

    // 监听文件修改，自动重启 vite 服务
    ViteRestart({ restart: ['vite.config.ts', '.env'] }),

    // 插件 hooks 自动引入
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-import.d.ts',
      resolvers: [ElementPlusResolver()]
    }),

    // 组件自动按需导入
    Components({
      // 目标文件夹
      dirs: ['src/components'],
      // 文件类型
      extensions: ['vue', 'tsx'],
      // 输出文件，里面都是一些import的组件键值对
      dts: 'src/components.d.ts',
      // ui库解析器，也可以自定义，需要安装相关UI库
      resolvers: [
        ElementPlusResolver(),
        // VantResolver(),
        // AntDesignVueResolver(),
      ]
    }),

    // 使用 gzip 压缩资源
    viteCompression(),

    // 图片压缩
    viteImagemin({
      // gif图片压缩
      gifsicle: {
        // 选择1到3之间的优化级别
        optimizationLevel: 3,
        // 隔行扫描gif进行渐进式渲染
        interlaced: false,
        // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
        // colors: 2 
      },
      // 选择0到7之间的优化级别
      optipng: { optimizationLevel: 7 },
      // jpeg  压缩质量，范围从0(最差)到100(最佳)。
      mozjpeg: { quality: 20 },
      // png
      pngquant: {
        // 达到或超过最高质量所需的最少量的颜色  0(最差)到1(最佳)
        quality: [0.8, 0.9],
        // 压缩速度，1(强力)到11(最快)
        speed: 4,
      },
      // svg压缩
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          {
            name: 'removeEmptyAttrs',
            active: false,
          }]
      }
    })
  ],

  css: {
    preprocessorOptions: {
      less: {
        // 全局引入style.less文件
        additionalData: `@import "${variablePath}";`
      }
    },
    postcss: {
      plugins: [
        // 指定目标浏览器 解决浏览器兼容性
        autoprefixer({
          overrideBrowserslist: ['> 1%', 'last 2 versions']
        })
      ]
    }
  },

  json: {
    // 是否支持从.json文件中进行按名导入
    namedExports: true,
    //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
    stringify: false,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@com': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@store/*': resolve(__dirname, 'src/store')
    },
    // 导入时想要忽略的扩展名列表
    extensions: ['.js', '.ts', '.tsx', '.json', 'vue'],
  },

  // 跨域
  server: {
    // 使用IP能访问
    host: "0.0.0.0",
    // 热更新
    hmr: true,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //自定义代理规则
    proxy: {
      // 选项写法
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    }
  }
});
