<template>
  <div id="l-table">
    <el-table
      :data="tableData"
      v-bind="attributes"
      style="width: 100%"
      @cell-mouse-enter="showEdit"
      @cell-mouse-leave="hideEdit"
    >
      <template v-for="item in fields">
        <el-table-column
          v-if="item.type === 'template'"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          :key="item.field"
          :align="item.align ? item.align : 'center'"
          :sortable="item.sortable"
          :sort-method="generateSortFun(item.sortMethod)"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <slot :name="item.field" :row="row"></slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type === 'edit'"
          :prop="item.field"
          :key="item.field"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : 'center'"
          :sortable="item.sortable"
          :sort-method="generateSortFun(item.sortMethod)"
        >
          <template slot-scope="{ row }">
            <template v-if="row.edit &&  item.field === currentHover && tableData.indexOf(row) === currentIndex">
              <el-input ref="input" v-model="row.editValue" size="mini" @keyup.enter.native="hideInput($event,item.field,row)"/>
            </template>
            <span v-else class="is-edit">
              {{ row[item.field] }}
              <i class="el-icon-edit edit-cell" v-if="item.field === currentHover && tableData.indexOf(row) === currentIndex" @click="showInput(item.field,row)"></i>
            </span>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.filter"
          :prop="item.field"
          :key="item.field"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : 'center'"
          :sortable="item.sortable"
          :sort-method="generateSortFun(item.sortMethod)"
          show-overflow-tooltip
          :filters="item.filters"
          :filter-method="filterMethod"
          filter-placement="bottom-end"
        ></el-table-column>

        <el-table-column
          v-else
          :prop="item.field"
          :key="item.field"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : 'center'"
          :sortable="item.sortable"
          :sort-method="generateSortFun(item.sortMethod)"
          show-overflow-tooltip
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[20, 50, 100]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { debounce } from 'throttle-debounce'
export default {
  components: {
  },
  props: {
    // 父组件传过来的数据 如果存在getDataHandler，data数据会被覆盖
    data: {
      type: Array,
      default(){
        return []
      }
    },
    // el-table的属性
    attributes: {
      type: Object,
      default(){}
    },
    // 字段数组
    fields: {
      type: Array,
      default(){
        return []
      }
    },
    // 请求数据的方法
    getDataHandler:{
      type: Function,
      default(){}
    },
    // 行内编辑成功的回调方法
    editHandler:{
      type: Function,
      default(){}
    }
  },
  data () {
    return {
      tableData:[],
      total: 0,
      params: {
        page: 1,
        pageSize: 20
      },
      dynamic: {}, //存放动态参数
      lastParams: {}, //存放上次请求的所有参数
      getData: null,
      currentHover: null, //当前鼠标hover的单元格
      currentIndex: null, //当前鼠标hover的单元格
      filterArr: [] // 支持过滤的字段
    }
  },
  watch: {
    data: {
      handler(){
        this.tableData = this.data.slice(0, this.params.pageSize)
        this.total = this.data.length
      },
      immediate: true
    },
    tableData: {
      handler(){
        this.filterArr.map(e=>{
          const s = new Set()
          let arr = []
          this.tableData.map(n=>{
            s.add(n[e.field])
          })
          Array.from(s).map(n=>{
            if (n) arr.push({text: n,value: n})
          })
          this.$set(this.fields[e.index], 'filters', arr)
        })
      },
      immediate: true
    },
    fields: {
      handler(){
        this.fields.map((e,i)=>{
          if(e.filter){
            this.filterArr.push({index: i,field: e.field})
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.getData = debounce(200, this.query)
  },
  methods: {
    async query(obj){
      this.dynamic = obj
      this.params.page = 1
      this.lastParams = {...this.params, ...obj}
      const {data} = await this.getDataHandler({ ...this.params, ...obj })
      this.tableData = data.list
      this.total = data.total
    },
    async refreshData(){
      const {data} = await this.getDataHandler(this.lastParams)
      this.tableData = data.list
      this.total = data.total
    },
    async handleSizeChange(pageSize){
      this.params.pageSize = pageSize
      if(this.getDataHandler.toString() != 'function _default() {}'){
        const {data} = await this.getDataHandler({ ...this.params, ...this.dynamic })
        this.tableData = data.list
        this.total = data.total
      } else {
        this.tableData = this.data.slice((this.params.page-1) * this.params.pageSize, this.params.page *this.params.pageSize)
      }
    },
    async handleCurrentChange(page){
      this.params.page = page
      if(this.getDataHandler.toString() != 'function _default() {}'){
        const {data} = await this.getDataHandler({ ...this.params, ...this.dynamic })
        this.tableData = data.list
        this.total = data.total
      } else {
        this.tableData = this.data.slice((this.params.page-1) * this.params.pageSize, this.params.page *this.params.pageSize)
      }
    },
    showEdit(row, column){
      this.currentIndex = this.tableData.indexOf(row)
      this.currentHover = column.property
    },
    hideEdit(row){
      delete row.edit
      this.currentHover = null
      this.currentIndex = null
    },
    showInput(field,row){
      this.$set(row,'edit',true)
      this.$set(row,'editValue',row[field])
    },
    hideInput(e,field,row){
      delete row.edit
      delete row.editValue
      row[field] = e.target.value
      this.editHandler([row])
    },
    generateSortFun(funBody){
      var sortMethod = null 
      if(funBody) {
        if(typeof funBody === 'string'){
          sortMethod = new Function('a','b',funBody)
        } else sortMethod = funBody
      }
      return sortMethod
    },
    filterMethod(value, row, column){
      return row[column.property] === value
    }
  }
}
</script>
<style lang="scss" scoped>
#l-table{
  ::v-deep{
    .iconfont{
      color: #E60012;
      margin: 0 3px;
      cursor: pointer;
    }
    .cell{
      line-height: 28px!important;
    }
    .el-table{
      border-radius: 8px;
    }
    .el-table__header-wrapper .cell{
      font-weight: bold
    }
    .el-table__row{
      .edit-cell{
        margin-left: 3px;
        color: #E60012
      }
      .is-edit{
        display: inline-block;
        width: 100%;
        cursor: pointer;
      }
    }
    .el-tooltip{
      .el-button{
        border: unset;
        padding: 0
      }
      .is-disabled{
        i{
          color: #f3c2c5;
          cursor: not-allowed
        }
      }
      i{
        margin: 0
      }
    }
    .el-table .descending .sort-caret.descending{
      border-top-color: #E60012
    }
    .el-table .ascending .sort-caret.ascending{
      border-bottom-color: #E60012
    }
    .el-table--border th, .el-table--border td,.el-table th.is-leaf, .el-table td{
      border-color: #e7ebf4
    }
  }
}
</style>
