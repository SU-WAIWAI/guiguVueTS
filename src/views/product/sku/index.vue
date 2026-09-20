<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
  reqUpdateSku,
} from '@/api/product/sku'
import type {
  SkuData,
  SkuResponseData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
let editVisible = ref(false)
let skuForm = reactive<SkuData>({})
onMounted(() => {
  getHasSku()
})

const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)

  if (res.code === 200) {
    total.value = res.data.total
    skuArr.value = res.data.records
  }
}

const handler = (pageSizes: number) => {
  getHasSku()
}

const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
    getHasSku(pageNo.value)
  } else {
    await reqSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
    getHasSku(pageNo.value)
  }
}

const updateSku = (row: SkuData) => {
  Object.assign(skuForm, JSON.parse(JSON.stringify(row)))
  editVisible.value = true
}

const saveSku = async () => {
  const res = await reqUpdateSku(skuForm)
  if (res.code === 200) {
    editVisible.value = false
    ElMessage({ type: 'success', message: 'SKU 修改成功' })
    getHasSku(pageNo.value)
  }
}

const findSku = async (row: SkuData) => {
  drawer.value = true
  let res: SkuInfoData = await reqSkuInfo(row.id as number)
  skuInfo.value = res.data
}

const removeSku = async (id: number) => {
  let res = await reqRemoveSku(id)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({ type: 'error', message: '系统数据不能删除' })
  }
}
</script>
<template>
  <el-card>
    <el-table border style="margin: 10px 0; width: 100%" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px" fixed></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip width="350px" prop="skuDesc"></el-table-column>
      <el-table-column label="图片" width="250px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" fixed="right" width="450px">
        <template #="{ row, $index }">
          <el-button size="small" :icon="row.isSale === 1 ? 'Bottom' : 'Top'" @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku(row)"></el-button>
          <el-button type="info" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
          <el-popconfirm :title="`你确定要删除${row.skuName}`" width="200px" @confirm="removeSku(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper,->,sizes, total," :total="total" @current-change="getHasSku"
      @size-change="handler" />
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
    <el-dialog v-model="editVisible" title="编辑 SKU" width="520px">
      <el-form label-width="90px">
        <el-form-item label="SKU 名称"><el-input v-model="skuForm.skuName" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="skuForm.skuDesc" type="textarea" /></el-form-item>
        <el-form-item label="价格"><el-input v-model="skuForm.price" type="number" /></el-form-item>
        <el-form-item label="重量(g)"><el-input v-model="skuForm.weight" type="number" /></el-form-item>
        <el-form-item label="图片地址"><el-input v-model="skuForm.skuDefaultImg" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSku">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
