# Table表格
基于[el-table](https://element.eleme.cn/#/zh-CN/component/table)
#### 用法
``` html
<template>
  <l-table
    ref="table"
    :attributes="tableOptions"
    :fields="fields"
    :getDataHandler="$api.demand.getDemands"
  >
    <template v-slot:demandId="{row}">
      <span class="demandIdSpan" :style="getStyle(row.priority)">{{ row.demandId }}</span>
    </template>
  </l-table>
</template>
<script>
  export default {
    data(){
      fields: [{
        field: 'demandId',
        label: 'ID',
        type: 'template',
        width: '80px'
      },{
        field: 'priority',
        label: this.$t('优先级'),
        type: 'template',
        sortable: true,
        sortMethod: this.sortByPriority,
        width: '100px'
      }],
      tableOptions: {
        stripe: true,
        border: true
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
| getDataHandler  | 查询数据的回调方法   | Function | - |
| editHandler  | 行内编辑回调方法  | Function  | - |  
  
#### fieldsItem  
| 参数  | 说明   | 类型 |  默认值 |
| ---- |  ----  | ----  | ----  |
| field | 接口字段名 | String | - |
| label | 表头 | String | field |
| type | 单元格类型,详情请查看[type](/doc/table?id=type)| String | 默认为普通格式 |
| sortable | 是否可排序，参照[sort()](https://www.w3school.com.cn/js/jsref_sort.asp) | Boolean | false |
| sortMethod | 排序函数 | Function | - |
| width | 列的宽度(需要带上px) | String | auto |
| filter | 列筛选 | Boolean | false |

#### type  
| 可选值 | 说明   |
| ---- |  ----  |
| template |  自定义插槽模式，需要指定v-slot为当前字段名  |
| edit |  行内编辑模式  |

