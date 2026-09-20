import SvgIcon from '../components/SvgIcon/index.vue'
import Pagination from '../components/Pagination/index.vue'
import Category from '../components/Category/index.vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from '@/store'
import useUserStore from '@/store/modules/user'

//全局对象
const allGlobalComponent:any = {SvgIcon,Pagination,Category}

//对外暴漏插件对象
export default {
  //务必叫做install方法
  install(app:any){
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach(key =>{
      //注册为全局组件
      app.component(key, allGlobalComponent[key])
    });
    //将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.directive('has', {
      mounted(el: HTMLElement, binding: { value: string }) {
        const { buttons } = useUserStore(pinia)
        if (binding.value && !buttons.includes(binding.value)) {
          el.parentNode?.removeChild(el)
        }
      },
    })
  }
}
