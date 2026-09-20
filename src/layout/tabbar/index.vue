<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 顶部左侧静态 -->
      <!-- <el-icon
        style="margin-right: 10px;"
        @click="changeIcon"
      >
        <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand' "></component>
      </el-icon> -->

      <!-- 左侧面包屑 -->
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <!-- 右侧设置区域 -->
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to bottom, transparent, #fff 400px),
    linear-gradient(to right, #beecd8 20%, #f4e2d8);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
