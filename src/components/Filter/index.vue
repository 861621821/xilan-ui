<template>
  <div id="xl-filter">
    <span
      class="xl-filter-item tab-item"
      v-for="item in tabOptions"
      :key="item.value"
      :class="{active:current === item.value}"
      @click="handlerTabClick(item)"
    >{{item.label}}</span>
    <el-dropdown @command="handleCommand" v-if="dropdownOptions.length">
      <span class="xl-filter-item el-dropdown-link" :class="{active: this.command.value}">
        {{ this.command.label || 更多}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :command="item"
          v-for="item in dropdownOptions"
          :key="item.value"
        >{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-select
      v-model="selectVal"
      :placeholder="请选择"
      v-if="selectOptions.length"
      class="xl-filter-item"
      size="mini"
    >
      <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-popover placement="bottom" width="700" v-model="popover">
      <div class="xl-filter-box">
        <el-row :gutter="20">
          <el-form ref="form" :model="filterField" label-width="100px">
            <el-col :span="12" v-for="(item,i) in filterOptions" :key="i">
              <el-form-item :label="item.label" v-if="item.type === 'radio'">
                <el-radio v-model="filterField[item.field]" :label="e.value" v-for="(e,n) in item.options" :key="n">{{e.label}}</el-radio>
              </el-form-item>
              <el-form-item :label="item.label" v-if="item.type === 'checkboxGroup'">
                <el-checkbox-group v-model="filterField[item.field]">
                  <el-checkbox
                    v-for="(e,j) in item.options"
                    :key="j"
                    :label="e.value"
                    :name="item.field"
                  >{{e.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item :label="item.label" v-else-if="item.type === 'input'">
                <el-input v-model="filterField[item.field]" size="mini" clearable @keydown.enter.native="doFilter"></el-input>
              </el-form-item>
              <el-form-item :label="item.label" v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  v-model="filterField[item.field]"
                  type="daterange"
                  size="mini"
                  range-separator="-"
                  :start-placeholder="开始日期"
                  :end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item :label="item.label" v-else-if="item.type === 'select'">
                <el-select
                  filterable
                  v-model="filterField[item.field]"
                  clearable
                  class="product-name"
                  size="mini"
                >
                  <el-option
                    v-for="(item,i) in item.options"
                    :key="i"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div style="text-align:center">
        <el-button type="danger" size="mini" @click="doFilter">过滤</el-button>
      </div>
      <el-button
        slot="reference"
        type="danger"
        plain
        class="xl-filter-item"
        v-if="filterOptions.length"
        size="mini"
        icon="iconfont iconguolv"
      >过滤</el-button>
    </el-popover>
    <!-- 筛选条件展示 -->
    <div class="selected">
      <div v-for="(tag,i) in selected" :key="i" class="option-item">
        <span class="lable">{{tag.label +'：'+ tag.value}}</span>
        <i class="el-icon-close" @click="doDelete(tag,i)"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value:{
      tyep:Object,
      default(){}
    },
    tabOptions:{
      type: Array,
      default(){
        return []
      }
    },
    // dropdown形式
    dropdownOptions:{
      type: Array,
      default(){
        return []
      }
    },
    // 下拉框形式
    selectOptions:{
      type: Array,
      default(){
        return []
      }
    },
    filterOptions:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      tabArr: [],
      dropdownArr: [],
      default: '',
      command: {}, // 选择dropdown选项后更多按钮处显示的值
      current:'',
      selectVal: '',
      popover: false,
      filterField: {},
      selected: [],
      translater: {}
    }
  },
  watch: {
  },
  created () {
    this.tabOptions.forEach(e=>{
      if(e.default){
        this.default = e.value
        this.current = e.value
        return
      }
    })
    this.filterOptions.forEach(e=>{
      if(e.type === "checkboxGroup" || e.type === "datePicker"){
        this.$set(this.filterField,e.field,[])
      } else this.$set(this.filterField,e.field,'')
      this.translater[e.field] = e.label
    })
    Object.assign(this.filterField,this.value)
  },
  mounted () {
  },
  methods: {
    reset(){
      this.command = {}
      this.current = this.default
      this.selected = []
      this.filterField = {}
    },
    handlerTabClick({value}){
      this.command = {}
      this.current = value
      let obj = {tab: this.current || this.command.value,filter: {}}
      for (const key in this.filterField) {
        const value = this.filterField[key]
        if(typeof value === 'string' && value !== ''){
          obj.filter[key] = value
        } else if(value instanceof Array && value.length > 0){
          obj.filter[key] = value
        }
      }
      this.$emit('change',obj)
    },
    handleCommand(command) {
      this.command = command
      this.current = ''
      let obj = {tab: this.current || this.command.value,filter: {}}
      for (const key in this.filterField) {
        const value = this.filterField[key]
        if(typeof value === 'string' && value !== ''){
          obj.filter[key] = value
        } else if(value instanceof Array && value.length > 0){
          obj.filter[key] = value
        }
      }
      this.$emit('change',obj)
    },
    doFilter(){
      let obj = {tab: this.current || this.command.value,filter: {}}
      for (const key in this.filterField) {
        const value = this.filterField[key]
        if(typeof value === 'string' && value !== ''){
          obj.filter[key] = value
        } else if(value instanceof Array && value.length > 0){
          obj.filter[key] = value
        }
      }
      this.$emit('change',obj)
      this.popover = false
      this.selected = []
      for (const key in this.filterField) {
        if(this.filterField[key].length){
          this.selected.push({field: key, label: this.translater[key], value: this.filterField[key]})
        }
      }
    },
    doDelete(tag,i){
      this.filterOptions.forEach(e=>{
        if(e.field === tag.field){
          if(e.type === "checkboxGroup" || e.type === "datePicker"){
            this.filterField[tag.field] = []
          } else {
            this.filterField[tag.field] = ''
          }
        }
      })
      this.selected.splice(i,1)
      
      let obj = {tab: this.current || this.command.value,filter: {}}
      for (const key in this.filterField) {
        const value = this.filterField[key]
        if(typeof value === 'string' && value !== ''){
          obj.filter[key] = value
        } else if(value instanceof Array && value.length > 0){
          obj.filter[key] = value
        }
      }
      this.$emit('change',obj)
    }
  }
}
</script>
<style lang="scss" scoped>
#xl-filter{
  user-select: none;
  color: #606266;
  white-space: nowrap;
  &>.xl-filter-item{
    color: #4c4d57;
  }
  .xl-filter-item{
    margin: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: bold;
    &.active{
      color: #e60012
    }
    ::v-deep{
      .iconfont{
        font-size: 12px;
        margin-right: 3px;
        font-weight: bold;
      }
    }
    
  }
  ::v-deep{
    .el-select .el-input__inner{
      width: 120px
    }
  }
}
.xl-filter-box{
  margin-bottom: 10px;
  ::v-deep{
    .el-date-editor--daterange.el-input__inner{
      width: 100%;
    }
    .el-form-item__label,.el-checkbox__label,.el-radio__label{
      font-size: 12px
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
      background-color: #e60012;
      border-color: #e60012
    }
    .el-checkbox__input.is-checked + .el-checkbox__label{
      color: #e60012
    }
  }
  .el-select{
    width: 100%;
  }
}
.el-checkbox{
  margin-right: 10px!important;
  ::v-deep{
    .el-checkbox__label{
      padding-left: 5px!important
    }
  }
}
.el-popper{
  margin-top: 0;
  .el-dropdown-menu__item:not(.is-disabled):hover,.el-dropdown-menu__item:focus{
    color: #e60012;
    background-color: unset
  }
}
.selected{
  height: 24px;
  .option-item{
    margin: 0 5px;
    display: inline-block;
    height: 21px;
    line-height: 19px;
    padding: 0 8px;
    background-color: #fef0f0;
    border: 1px solid #fde2e2;
    color: #f56c6c;
    border-radius: 2px;
    .lable{
      display: inline-block;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      margin-right: 8px;
    }
    .el-icon-close{
      float: right;
      margin-top: 3px;
      cursor: pointer;
    }
    .el-icon-close:hover{
      border-radius: 50%;
      background: #f56c6c;
      color: #fff;
    }
  }
}
</style>
