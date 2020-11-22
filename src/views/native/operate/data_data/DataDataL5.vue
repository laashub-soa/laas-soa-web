<template>
  <div>


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
  }
</script>

<style scoped>

</style>
