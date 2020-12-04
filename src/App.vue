<template>
  <div id="app" style="height: 100vh;">
    <!-- <div style="width: 400px;margin: 0 auto">
      <xl-marquee v-if="show" :speed="speed" :delay="1000" :content="text" direction="down"></xl-marquee>
      <el-button size="mini" @click="jiasu" style="margin-right: 10px">加速</el-button>{{speed}}
      <el-button size="mini" @click="jiansu">减速</el-button>
    </div> -->
    <!-- <el-form ref="form" label-width="80px" style="width: 300px">
      <el-form-item label="省市区">
        <xl-ssq v-model="ssq" ></xl-ssq>
      </el-form-item>
    </el-form> -->
    <!-- <div class="table" style="height: 100%;overflow: scroll">
      <xl-table
        :data="tableData"
        :fields="fields"
        :float-paging="true"
        :el="el"
        :distance="0"
      ></xl-table>
    </div> -->
    <!-- <div :style="{width: '200px',margin: '100px auto'}">
      <xl-tool-tip content="我是测试文本，显示不下的时候hover出现气泡提示" placement="top"></xl-tool-tip><br><br>
      <xl-tool-tip content="我是测试文本，显示不下的时候hover出现气泡提示" placement="bottom"></xl-tool-tip><br><br>
      <xl-tool-tip content="我是测试文本，显示不下的时候hover出现气泡提示" placement="left"></xl-tool-tip><br><br>
      <xl-tool-tip content="我是测试文本，显示不下的时候hover出现气泡提示" placement="right"></xl-tool-tip>
    </div> -->
  </div>
</template>

<script>
// import xlTable from '@/components/Table/index.vue'
// import xlMarquee from '@/components/Marquee/index.vue'
// import xlSsq from '@/components/Cascader/index.vue'
// import xlToolTip from '@/components/ToolTip/index.vue'
// import xlFilter from '@/components/Filter/index.vue'
export default {
  name: 'App',
  components: {
    // xlMarquee,
    // xlSsq,
    // xlFilter,
    // xlTable,
    // xlToolTip
  },
  data () {
    return {
      speed: '3',
      show: true,
      el: null,
      // text: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
      text: [
        '1.全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
        '2.用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。',
        '3.使用带斑马纹的表格，可以更容易区分出不同行的数据。',
        '4.可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。'
      ],
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
        ],
      tableData: [{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },{
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      fields: [{
        field: 'name',
        label: '姓名'
      },{
        field: 'address',
        label: '地址',
        type: 'edit'
      }]
    }
  },
  mounted () {
    this.el = document.querySelector('.table')
  },
  methods: {
    jiasu(){
      if(this.speed < 5){
        this.show = false
        this.speed ++
        this.$nextTick(()=>{
          this.show = true
        })
      }
    },
    jiansu(){
      if(this.speed > 1){
        this.show = false
        this.speed --
        this.$nextTick(()=>{
          this.show = true
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
