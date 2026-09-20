<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import { useRoute } from 'vue-router'
//从pinia中获取用户数据
import useUserStore from '../store/modules/user'
//引入主题区域
import Main from './main/index.vue'
//引入tabbar
import Tabbar from './tabbar/index.vue'

import useLayoutSettingStore from '../store/modules/setting'


const settingStore = useLayoutSettingStore()
const userStore = useUserStore()

const route = useRoute()

</script>

<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: settingStore.fold }">
      <Logo :fold="settingStore.fold" />
      <!-- 滚动条 -->
      <el-scrollbar class="scrollbar">
        <el-menu
         class="el-menu-vertical-demo"
          :collapse="settingStore.fold"
          :default-active="route.path"
          router
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: settingStore.fold }">
      <Tabbar :fold="settingStore.fold" />
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{ fold: settingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  height: 100vh;
  width: 100%;


  .layout_slider {
    width: 240px;
    height: 100vh;
    // background: rgba(0, 21, 43,1) !;
    transition: all 0.3s;
    // border-right: 1px solid #e6e6e6;
    .scrollbar {
      width: 100%;
      height: calc(100% - 50px);

      // 这里需要加点(.),你可以认为是ui组件自带的类名
      .el-menu {
        // border-right: none;
        // background:rgba(0, 21, 43,1);
        // color: #fff !important;
      }
    }
    &.fold {
      width: calc(100% - 50px);
      left: 50px;
      // border-right: 1px solid #e6e6e6;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: 240px;
    width: calc(100% - 240px);
    height: 50px;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - 50px);
      left: 50px;
    }
  }

  .layout_main {
    position: absolute;
    top: 50px;
    left: 240px;
    width: calc(100% - 240px);
    height: calc(100% - 50px);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - 50px);
      left: 50px;
    }
  }
}

</style>
