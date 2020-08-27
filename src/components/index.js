import Vue from "vue"
import xlTable from "./Table/index.vue"
import xlFilter from "./Filter/index.vue"
import xlToolTip from "./ToolTip/index.vue"
import xlMarquee from "./Marquee/index.vue"

const Components = {
  xlTable,
  xlFilter,
  xlToolTip,
  xlMarquee
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components