//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import {GET_Category_one,GET_Category_two,GET_Category_three,GET_ATTR_INFO} from '@/api/product/attr'
import { ref } from 'vue'
import type { Attr, AttrResponseData, CategoryObj, CategoryResponseData } from '@/api/product/attr/type'


interface itemInfo{
  id:number | string,
  name:string
}

let useCategoryState =  defineStore('category',{
  state:()=>{
    return {
      categoryOne:ref<itemInfo[]>([]),
      categoryTwo:ref<itemInfo[]>([]),
      categoryThree:ref<itemInfo[]>([]),

      categoryIdOne:ref<any>(null),
      categoryIdTwo:ref<any>(null),
      categoryIdThree:ref<any>(null),

      tableData: [] as Attr[],
    }
  },
  actions:{
     // 获取一级分类数据
    async getCategoryOneList(){
     let res:CategoryResponseData = await GET_Category_one()
     this.categoryOne = res.data
    },
     // 获取二级分类数据
    async getCategoryTwoList(id:number){
     let res:CategoryResponseData = await GET_Category_two(id)
     this.categoryTwo = res.data
    },
     // 获取二级分类数据
    async getCategoryThreeList(id:number){
     let res:CategoryResponseData = await GET_Category_three(id)
     this.categoryThree = res.data
    },
     // 获取二级分类数据
    async getTableDataList(){
     const res: AttrResponseData = await GET_ATTR_INFO(Number(this.categoryIdOne), Number(this.categoryIdTwo), Number(this.categoryIdThree))
     this.tableData = res.data
    }

  }
})

export default useCategoryState
