import request from '@/utils/request'
import type { ResponseData,AttrResponseData,Attr } from './type'

enum API {
  GET_ATTR_INFO = '/admin/product/attrInfoList',
  GET_Category_one = '/admin/product/getCategory1',
  GET_Category_two = '/admin/product/getCategory2',
  GET_Category_three = '/admin/product/getCategory3',
  DELETE_ATTR = '/admin/product/deleteAttr/',
  SAVE_ATTR = '/admin/product/saveAttrInfo',
}

export const GET_Category_one = () =>
  request.get<ResponseData, any>(
    API.GET_Category_one,
  )
export const GET_Category_two = (categoryId:number) =>
  request.get<any, any>(
    API.GET_Category_two + `/${categoryId}`,
  )
/**
 * 获取三级分类数据的异步请求函数
 * @returns {Promise<attrInfo>} 返回一个Promise，解析后为attrInfo类型的数据
 */
export const GET_Category_three = (categoryId:number) =>
  request.get<any, any>(
    API.GET_Category_three + `/${categoryId}`,  // 拼接API路径，传入id参数获取对应的三级分类数据
  )

export const GET_ATTR_INFO = (categoryIdOne:number,categoryIdTwo:number,categoryIdThree:number) =>
  request.get<any, AttrResponseData>(
    API.GET_ATTR_INFO + `/${categoryIdOne}/${categoryIdTwo}/${categoryIdThree}`,  // 拼接API路径，传入id参数获取对应的三级分类数据
  )

//   export const reqAttr = (
//   category1Id: number | string,
//   category2Id: number | string,
//   category3Id: number | string,
// ) =>
//   request.get<any, AttrResponseData>(
//     API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
//   )

export const saveOrUpdateAttr = (data:Attr) =>
  request.post<any, any>(API.SAVE_ATTR,data)


export const DELETE_ATTR = (attrId: number) =>
  request.delete<any, any>(API.DELETE_ATTR + attrId)
