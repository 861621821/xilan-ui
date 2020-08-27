<template>
  <div id="app">
    <div style="width: 500px;margin: 0 auto">
      <xl-marquee :speed="5" :delay="2000" :interval="50" :iterations="1" :text="text"></xl-marquee>
    </div>
  </div>
</template>

<script>
import xlMarquee from '@/components/Marquee/index.vue'
export default {
  name: 'App',
  components: {
    xlMarquee
  },
  data () {
    return {
      text: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
      // text: [
      //   '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
      //   '用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。',
      //   '使用带斑马纹的表格，可以更容易区分出不同行的数据。',
      //   '可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。'
      // ]
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
