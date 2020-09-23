# 省市区三级联动
基于[el-popover](https://element.eleme.cn/#/zh-CN/component/popover)
> 省市区三级联动组件，支持搜索,默认显示全国省市区信息，如需显示国外或国内部分省市区信息，可通过data字段传入
#### 基础用法  
``` html
<template>
  <xl-ssq v-model="ssq"></xl-ssq>
</template>
<script>
  export default {
    data(){
      return{
        ssq: []
      }
    }
</script>
```
#### 自定义数据源
``` html
<template>
  <xl-ssq v-model="ssq" :data="ssqData"></xl-ssq>
</template>
<script>
  export default {
    data(){
      return{
        ssq: [],
        ssqData: [
          {
            name: '省份1',
            adcode: 'prov1',
            districtList: [
              {
                name: '城市1',
                adcode: 'city1-1',
                districtList: [
                  {
                    name: '区域1-1-1',
                    adcode: '111',
                  },
                  {
                    name: '区域1-1-2',
                    adcode: '112',
                  },
                  {
                    name: '区域1-1-3',
                    adcode: '113',
                  }
                ]
              },
              {
                name: '城市2',
                adcode: 'city1-2',
                districtList: [
                  {
                    name: '区域1-2-1',
                    adcode: '121',
                  },
                  {
                    name: '区域1-2-2',
                    adcode: '122',
                  },
                  {
                    name: '区域1-2-3',
                    adcode: '123',
                  }
                ]
              }
            ]
          }
        ]
      }
    }
</script>
```
#### 属性  
| 参数  | 说明    | 类型 |  默认值 |
| ---- |  ----  | ----  | ----  |
| data  | 自定义数据源  | Array  | - |