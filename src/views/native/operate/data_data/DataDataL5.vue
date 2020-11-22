<template>
  <div>
    <DataDataL4 v-for="item in data_data_pre_constraint"></DataDataL4>
  </div>
</template>

<script>
  import DataDataL4 from '@/views/native/operate/data_data/DataDataL4.vue'

  export default {
    name: "DataData"
    , components: {DataDataL4}
    , props: {
      "data_data_pre_constraint": { // 数据模型层级前置约束
        type: Object,
        default: null, // 事先定义好数据
      },
    }
    , methods: {}
    , created: {}
  }
</script>

<style scoped>

</style>
