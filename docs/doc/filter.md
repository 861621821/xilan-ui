# Filter过滤器
基于[el-dropdown](https://element.eleme.cn/#/zh-CN/component/dropdown) [el-popover](https://element.eleme.cn/#/zh-CN/component/popover)  
#### 用法
``` html
<template>
  <xl-filter
    ref="filter"
    :tabOptions="tabOption"
    :filterOptions="filterOptions"
    :dropdownOptions="dropdownOptions"
    @change="handlerTabChange"
  />
</template>
<script>
  export default(){
    data(){
      tabOption: [{
        value:'全部',
        label: '全部'
      },{
        value:'未关闭',
        label: '未关闭',
        default: true
      },{
        value:'我创建',
        label: '我创建'
      },{
        value:'我取消',
        label:'我取消'
      }],
      dropdownOptions: [{
        value:'待验收',
        label:'待验收'
      },{
        value:'验收中',
        label:'验收中'
      },{
        value:'待更新',
        label:'待更新'
      }],
      filterOptions: [
        {label:'ID',field:'demandId',type:'input'},
        {label:'事务名称',field:'demandName',type:'input'},
        {label:'产品线',field:'cpxName',type:'select',options: this.options.cpxOptions},
        {label:'产品',field:'cpName',type:'select',options: this.options.cpOptions}
      ]
    },
    methods: (){
      handlerTabChange(n){
        let filter = {...n.filter}
        if(filter.time && filter.time.length){
          filter.startDate = filter.time[0]
          filter.endDate = filter.time[1]
        }
        this.tabParams = {...filter}
        switch (n.tab) {
          case '全部':
            break;
          case '我创建':
            this.tabParams.founder = this.user
            break;
          case '我评审':
            this.tabParams.approver = this.user
            break;
          case '我取消':
            this.tabParams.closePerson = this.user
            this.tabParams.stage = '已取消'
            break;
          default:
            this.tabParams.stage = n.tab
        }
        this.$refs.table.getData({...this.treeParams, ...this.tabParams, viewMdule: '1'})
      }
    }
  }
</script>
```
#### 属性  
| 参数 |  说明  | 类型  | 默认值  |
| ---- | ----  | ----  | ----  |
| tabOptions  | 对象形式的tab集合，详情请查看[tabItem](/doc/filter?id=tabItem) | Array | - |
| dropdownOptions  | 对象形式的dropdown集合，详情请查看[dropdownItem](/doc/filter?id=dropdownItem) | Array | - |
| filterOptions  | 对象形式的表单集合，详情请查看[filterItem](/doc/filter?id=filterItem) | Array | - |  

#### tabItem
| 参数 |  说明  | 类型  | 默认值  |
| ---- | ----  | ----  | ----  |
| value | value | String  | - |
| label | 页面显示的label | String  | - |
| default | 是否默认选中 | Boolean  | false |

#### dropdownItem
| 参数 |  说明  | 类型  | 默认值  |
| ---- | ----  | ----  | ----  |
| value | value | String  | - |
| label | 页面显示的label | String  | - |
| default | 是否默认选中 | Boolean  | false |

#### filterItem
| 参数 |  说明  | 类型  | 默认值 |
| ---- | ----  | ----  | ----  |
| field | 查询字段 | String  | - |
| label | 显示的label | String  | - |
| type | 表单类型（input、select、radio、datePicker），type为select/radio时需要指定[options](/doc/filter?id=options) | String  | - |

#### options
| 参数 |  说明  | 类型  | 默认值  |
| ---- | ----  | ----  | ----  |
| value | value | String  | - |
| label | 页面显示的label | String  | - |