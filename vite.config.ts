import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//引入svg需要用到的插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
//mock插件提供方法
import {viteMockServe} from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({command,mode})=>{
  //获取各种环境下对应的变量
 let env = loadEnv(mode,process.cwd())
 const useMock = command === 'serve' && env.VITE_USE_MOCK === 'true'
 return {
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs:[path.resolve(process.cwd(),'src/assets/icons')],
      symbolId:'icon-[dir]-[name]'
    }),
    viteMockServe({
      enable: useMock,
    }),
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src") //相对路径别名配置，使用 @ 代替 src
    }
  },
  //scss全局变量一个配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
  },
  // Mock 模式不需要代理；接入真实后端时复用 /api 前缀。
  server: useMock
    ? {}
    : {
        proxy: {
          [env.VITE_APP_BASE_API]: {
            target: env.VITE_SERVE,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
 }
})
