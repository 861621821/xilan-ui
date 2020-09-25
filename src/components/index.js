import Vue from "vue"
import xlTable from "./Table/index.vue"
import xlCascader from "./Cascader/index.vue"
import xlFilter from "./Filter/index.vue"
import xlToolTip from "./ToolTip/index.vue"
import xlMarquee from "./Marquee/index.vue"

const Components = {
  xlTable,
  xlCascader,
  xlFilter,
  xlToolTip,
  xlMarquee
}
for (const key in Components) {
  Vue.component(key, Components[key])
}

export default Components