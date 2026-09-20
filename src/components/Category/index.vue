<template>
  <el-card>
    <el-form :inline="true" label-width="100px">
      <el-form-item label="一级分类">
        <el-select @change="getCategotryTwo" :disabled="props.showTable" v-model="categoryState.categoryIdOne">
          <el-option v-for="item in categoryState.categoryOne" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select @change="getCategotryThree" :disabled="props.showTable" v-model="categoryState.categoryIdTwo">
          <el-option v-for="item in categoryState.categoryTwo" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select @change="getTableData" :disabled="props.showTable" v-model="categoryState.categoryIdThree">
          <el-option v-for="item in categoryState.categoryThree" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="">
import { onMounted } from 'vue'
import useCategoryState from '../../store/modules/category'

let categoryState = useCategoryState()

const props = defineProps({
  showTable: {
    type: Boolean,
    default: false
  }
})

// console.log(props.showTable, 'props.showTable')
// const disabled = props.showTable

async function getCategotryTwo(id: number) {
  categoryState.categoryIdTwo = ''
  categoryState.categoryIdThree = ''
  categoryState.getCategoryTwoList(id)
}

async function getCategotryThree(id: number) {
  categoryState.categoryIdThree = ''
  categoryState.getCategoryThreeList(id)
}

async function getTableData() {
  categoryState.getTableDataList()
}

onMounted(async () => {
  categoryState.getCategoryOneList()
})

</script>

<style scoped lang="scss"></style>
