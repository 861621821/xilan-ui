# Table表格
基于[el-table](https://element.eleme.cn/#/zh-CN/component/table)
>支持行内编辑
#### 用法
``` html
<template>
  <xl-table
    ref="table"
    :attributes="tableOptions"
    :fields="fields"
    :getDataHandler="$api.demand.getDemands"
  >
    <template v-slot:demandId="{row}">
      <span class="demandIdSpan" :style="getStyle(row.priority)">{{ row.demandId }}</span>
    </template>
  </xl-table>
</template>
<script>
  export default {
    data(){
      return{
        fields: [{
          field: 'demandId',
          label: 'ID',
          type: 'template',
          width: '80px'
        },{
          field: 'priority',
          label: '优先级',
          type: 'template',
          sortable: true,
          sortMethod: this.sortByPriority,
          width: '100px'
        }],
        tableOptions: {
          stripe: true,
          border: true
        }
      }
    },
    methods: {
      sortByPriority(a,b){
        const sort = ['低','一般','紧急','加急']
        const x = a.priority
        const y = b.priority
        return sort.indexOf(x) - sort.indexOf(y)
      }
    }
  }
</script>
```
#### 属性  
| 参数  | 说明    | 类型 |  默认值 |
| ---- |  ----  | ----  | ----  |
| data  | 默认给表格的数据,会被attributes里有data覆盖  | Array  | - |
| attributes  | 表格属性，同[Table Attributes](https://element.eleme.cn/#/zh-CN/component/table) | Object |  - |
| fields  | 对象形式的字段集合，详情请查看[fieldsItem](/doc/table?id=fieldsItem)  | Array | - |
| getDataHandler  | 查询数据的回调方法   | Function(params) | - |
| editHandler  | 行内编辑回调方法  | Function(row)  | - |  
  
#### fieldsItem  
| 参数  | 说明   | 类型 |  默认值 |
| ---- |  ----  | ----  | ----  |
| field | 接口字段名 | String | - |
| label | 表头 | String | field |
| type | 单元格类型,详情请查看[type](/doc/table?id=type)| String | 默认为普通格式 |
| sortable | 是否可排序 | Boolean | false |
| sortMethod | 排序函数，参照[sort()](https://www.w3school.com.cn/js/jsref_sort.asp) | Function(a,b)/String(函数体) | - |
| width | 列的宽度(需要带上px) | String | auto |
| filter | 列筛选 | Boolean | false |

#### type  
| 可选值 | 说明   |
| ---- |  ----  |
| template |  自定义插槽模式，__需要指定v-slot为当前字段名__  |
| edit |  行内编辑模式  |

#### Methods 
| 方法 | 说明   |
| --- | --- |
| refreshData |  刷新表格数据  |

