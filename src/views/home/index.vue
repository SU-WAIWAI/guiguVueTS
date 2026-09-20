<script setup lang="ts">
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let userStore = useUserStore()

const lineChartRef = ref<HTMLElement | null>(null)
const pieChartRef = ref<HTMLElement | null>(null)

onMounted(() => {
  initLineChart()
  initPieChart()
})

function initLineChart() {
  if (!lineChartRef.value) return
  const chart = echarts.init(lineChartRef.value)
  const option = {
    title: {
      text: '数据趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['下载量', '注册量'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '下载量',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: { color: '#5470c6' }
      },
      {
        name: '注册量',
        type: 'line',
        smooth: true,
        data: [80, 92, 71, 94, 60, 180, 150],
        itemStyle: { color: '#91cc75' }
      }
    ]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

function initPieChart() {
  if (!pieChartRef.value) return
  const chart = echarts.init(pieChartRef.value)
  const option = {
    title: {
      text: '数据占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '数据统计',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 1048, name: '访问量', itemStyle: { color: '#5470c6' } },
          { value: 735, name: '成交额', itemStyle: { color: '#91cc75' } },
          { value: 580, name: '下载量', itemStyle: { color: '#fac858' } },
          { value: 484, name: '成交量', itemStyle: { color: '#ee6666' } }
        ]
      }
    ]
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}
</script>

<template>
  <!-- <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="footer">
        <h3 class="title">
          {{ getTime() }}好~
          <span class="gradient">{{ userStore.username }}</span>
        </h3>
        <p class="subtitle">Nova Admin</p>
      </div>
    </div>
  </el-card> -->
  <el-card :bordered="false" class="card-wrapper">
    <el-row :gutter="[16, 16]">
      <el-col :span="24" :md="18">
        <div>
          <div class="user-info">
            <img src="@/assets/images/soybean.jpg" class="avatar" />
            <h3 class="username">
              {{ getTime() }}好,{{ userStore.username || 'admin' }},今天又是充满活力的一天!
            </h3>
          </div>
          <h5 style="margin-left: 100px;">今日多云转晴，20℃ - 25℃!</h5>
        </div>
      </el-col>
      <el-col :span="24" :md="6">
        <!-- <ASpace class="w-full justify-end" :size="24">
          <AStatistic v-for="item in statisticData" :key="item.id" class="whitespace-nowrap" v-bind="item" />
        </ASpace> -->
      </el-col>
    </el-row>
  </el-card>
  <!-- <el-card style="margin: 10px 0;"> -->
  <el-card style="margin: 20px 0;">
    <el-row :gutter="20">
      <el-col :span="6" :xs="12">
        <div class="stat-item">
          <div class="stat-title">待办</div>
          <div class="stat-value">12</div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="stat-item">
          <div class="stat-title">已办</div>
          <div class="stat-value">58</div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="stat-item">
          <div class="stat-title">待阅</div>
          <div class="stat-value">5</div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
        <div class="stat-item">
          <div class="stat-title">已阅</div>
          <div class="stat-value">32</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-row :gutter="10" style="margin: 20px 0;">
    <el-col :span="12" :md="12">
      <el-card>
        <div ref="lineChartRef" class="chart-container"></div>
      </el-card>
    </el-col>
    <el-col :span="12" :md="12">
      <el-card>
        <div ref="pieChartRef" class="chart-container"></div>
      </el-card>
    </el-col>
  </el-row>
  <!-- </el-card> -->
</template>
<style lang="scss" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .footer {
    margin-left: 20px;
    margin-top: 15px;

    .title {
      font-size: 35px;
      margin-bottom: 30px;
      font-weight: 900;

      .gradient {
        background: linear-gradient(to right, #001529, #001529, #ffffff);
        /* 渐变方向是从左到右，颜色从红色到绿色 */
        background-clip: text;
        -webkit-background-clip: text;
        /* 兼容WebKit浏览器（例如Chrome和Safari） */
        color: transparent;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .subtitle {
      font-style: italic;
      color: #ccc;
      font-weight: 700;
    }
  }
}

.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  .username {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
}

.chart-container {
  width: 100%;
  height: 350px;
}

.stat-item {
  text-align: center;
  padding: 20px 0;

  .stat-title {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: #409eff;
  }
}
</style>
