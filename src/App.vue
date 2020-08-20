<template>
  <div id="app">
    <xl-table></xl-table>
  </div>
</template>

<script>
import xlTable from '@/components/Table/index.vue'
export default {
  name: 'App',
  components: {
    xlTable
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
