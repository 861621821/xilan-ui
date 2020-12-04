<template>
  <div class="xl-ssq-cascader">
    <el-popover
      v-model="visible"
      popper-class="ssq-cascader"
      placement="bottom"
      trigger="click"
      :append-to-body="false"
      @show="getData"
      >
      <el-input slot="reference" readonly v-model="ssq" :size="size" placeholder="请选择省市区"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="省份" name="0">prov</el-tab-pane>
        <el-tab-pane label="城市" :disabled="!prov" name="1">city</el-tab-pane>
        <el-tab-pane label="区县" :disabled="!city" name="2">region</el-tab-pane>
      </el-tabs>
      <el-input class="search-input" clearable v-model="filterKey" size="mini" prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
      <div class="list-box" v-loading="loading" element-loading-spinner="el-icon-loading">
        <div class="option-list" :style="`left: -${activeName * 100}%`">
          <div class="prov-list">
            <el-scrollbar style="height: 100%">
              <span class="list-item" :class="{'is-active': item.name === prov}" v-for="item in provData.length ? provData : sourceProvData" :key="item.adcode || item.name" @click="setProv(item)">{{item.name}}</span>
            </el-scrollbar>
          </div>
          <div class="city-list">
            <el-scrollbar style="height: 100%">
              <span class="list-item" :class="{'is-active': item.name === city}"  v-for="item in cityData.length ? cityData : sourceCityData" :key="item.adcode || item.name" @click="setCity(item)">{{item.name}}</span>
            </el-scrollbar>
          </div>
          <div class="region-list">
            <el-scrollbar style="height: 100%">
              <span class="list-item" :class="{'is-active': item.name === region}"  v-for="item in regionData.length ? regionData : sourceRegionData" :key="item.adcode || item.name" @click="setRegion(item)">{{item.name}}</span>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    options: {
      type: Array,
      default(){}
    },
    value: {
      type: Array,
      default(){}
    },
    data: {
      type: Array,
      default(){}
    }
  },
  data () {
    return {
      visible: false,
      ssq: '',
      activeName: '0',
      sourceProvData: [],
      sourceCityData: [],
      sourceRegionData: [],
      provData: [],
      cityData: [],
      regionData: [],
      prov: '',
      city: '',
      region: '',
      loading: false,
      filterKey: ''
    }
  },
  watch: {
    value: {
      handler(v){
        this.ssq = v.join('/')
        v[0] && (this.prov = v[0])
        v[1] && (this.city = v[1])
        v[2] && (this.region = v[2])
      },
      immediate: true
    },
    filterKey(n){
      switch (this.activeName) {
        case '0':
          this.provData = this.sourceProvData.filter(e=>{
            return e.name.indexOf(n) > -1
          })
          break
        case '1':
          this.cityData = this.sourceCityData.filter(e=>{
            return e.name.indexOf(n) > -1
          })
          break;
        case '2':
          this.regionData = this.sourceRegionData.filter(e=>{
            return e.name.indexOf(n) > -1
          })
          break
      }
    }
  },
  mounted () {
    if(!window.AMap){
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://webapi.amap.com/maps?v=1.4.15&key=d1b80b9c953f8313296e0a1e7dd9d7d3';
      document.body.appendChild(s);
    }
    if(this.data){
      this.sourceProvData  = this.data
    }
  },
  methods: {
    getData(){
      if(this.sourceProvData.length){
        return
      }
      this.loading = true
      // eslint-disable-next-line
      AMap.plugin('AMap.DistrictSearch', ()=> {
      // eslint-disable-next-line
        var districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: 'country',
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 3
        })
        // 搜索所有省/直辖市信息
        districtSearch.search('中国', (status, res) =>{
          this.loading = false
          if(res.info === 'OK') {
            this.sourceProvData = res.districtList[0].districtList
          }
        })
      })
    },
    setProv(item){
      this.prov = item.name
      this.activeName = '1'
      this.filterKey = ''
      this.provData = []
      this.$emit('input', [this.prov])
      this.sourceProvData.map(e=>{
        if(this.prov === e.name){
          this.sourceCityData = e.districtList
        }
      })
    },
    setCity(item){
      this.city = item.name
      this.activeName = '2'
      this.filterKey = ''
      this.cityData = []
      this.$emit('input', [this.prov, this.city])
      this.sourceCityData.map(e=>{
        if(this.city === e.name){
          this.sourceRegionData = e.districtList
        }
      })
    },
    setRegion(item){
      this.region = item.name
      this.filterKey = ''
      this.regionData = []
      this.$emit('input', [this.prov, this.city, this.region])
      this.visible = false
    },
    reset(){
      this.ssq = '',
      this.activeName = '0'
      this.sourceProvData = [],
      this.sourceCityData = [],
      this.sourceRegionData = [],
      this.provData = [],
      this.cityData = [],
      this.regionData = [],
      this.prov = '',
      this.city = '',
      this.region = ''
    }
  }
}
</script>
<style>
  .ssq-cascader .el-tabs__content{
    display: none!important
  }
</style>

<style lang="scss" scoped>
::v-deep{
  .el-scrollbar__bar{
    right: 0;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden
  }
  .list-box .el-icon-loading{
    color: #000
  }
  .search-input .el-input__inner{
    border-radius: 28px;
  }
}
.list-box{
  overflow: hidden;
  height: 300px;
  width: 100%;
  position: relative;
  padding-top: 10px;
}
.option-list{
  height: 300px;
  width: 300%;
  position: absolute;
  transition: left .3s
}
.prov-list,.city-list,.region-list{
  height: 300px;
  width: 33.3%;
  overflow: hidden;
  float: left;
  .list-item{
    display: block;
    line-height: 32px;
    padding: 0 5px 0 15px;
    cursor: pointer;
    &:hover{
      background: #f7f7f7
    }
    &.is-active{
      background: #f2f2f2
    }
  }
}
</style>
