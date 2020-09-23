<template>
  <div id="app">
    <div style="width: 200px;margin: 0 auto">
      <xl-marquee :speed="3" :delay="1000" :text="text" direction="down"></xl-marquee>
    </div>
    <el-form ref="form" label-width="80px" style="width: 200px">
      <el-form-item label="省市区">
        <xl-ssq v-model="ssq" :data="ssqData"></xl-ssq>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import xlMarquee from '@/components/Marquee/index.vue'
import xlSsq from '@/components/SsqCascader/index.vue'
export default {
  name: 'App',
  components: {
    xlMarquee,xlSsq
  },
  data () {
    return {
      // text: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
      text: [
        '1.全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
        '2.用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。',
        '3.使用带斑马纹的表格，可以更容易区分出不同行的数据。',
        '4.可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。',
        '5.可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。',
        '6.可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。'
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
        ]
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
  margin-top: 60px;
}
</style>
