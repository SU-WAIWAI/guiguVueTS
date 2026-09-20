import { createApp } from 'vue'
import App from './App.vue'
//引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入全局样式
import '@/styles/index.scss'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import gloalComponent from './components'
// 引入路由
import router from './router'
//引入仓库
import pinia from './store'
import './permisstion'
//引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
//element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 使用插件
app.use(ElementPlus,{
  locale:zhCn
 });
//获取环境
// console.log(import.meta.env);

// 安装自定义插件
app.use(gloalComponent)
//注册模板路由
app.use(router)
app.use(pinia)

app.mount('#app')
