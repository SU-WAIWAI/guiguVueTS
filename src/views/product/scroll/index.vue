<template>
  <el-card>
    <div class="whole-page">
      <component :is="Vue3SeamlessScroll" :list="scrollOptions.list" :hover="scrollOptions.hover" :step="scrollOptions.step" :wheel="scrollOptions.wheel"
        :isWatch="true" class="scroll">
        <div v-for="item in list" :key="item.id" class="list-box">
          <div class="item">
            {{ item.name }}
          </div>
        </div>
      </component>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import { ref } from 'vue'
const list = ref([
  { id: '01', name: '放假啊咖啡机啊咖啡机啊发卡机1' },
  { id: '02', name: '放假啊咖啡机啊咖啡机啊发卡机2' },
  { id: '03', name: '放假啊咖啡机啊咖啡机啊发卡机3' },
  { id: '04', name: '放假啊咖啡机啊咖啡机啊发卡机4' },
  { id: '05', name: '放假啊咖啡机啊咖啡机啊发卡机5' },
  { id: '06', name: '放假啊咖啡机啊咖啡机啊发卡机6' },
  { id: '07', name: '放假啊咖啡机啊咖啡机啊发卡机7' },
])
const scrollOptions = {
  list: () => list.value,
  hover: () => true,
  step: () => 0.5,
  wheel: () => true,
}
</script>

<style scoped lang="scss">
.whole-page {
  height: 500px;
  overflow: hidden
}

.scroll {
  height: 200px;
  // overflow: hidden
}

.list-box {
  height: 40px;

  // overflow:hidden
  &:hover {
    background: pink
  }
}

.item {
  height: 40px;
  line-height: 40px;
  font-size: 16px
}
</style>
