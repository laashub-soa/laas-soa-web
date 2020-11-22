<template>
  <div>
    <DataDataL5 v-for="item in data_data_pre_constraint" :data_data_pre_constraint="item"></DataDataL5>
  </div>
</template>

<script>
  import DataDataL5 from '@/views/native/operate/data_data/DataDataL5.vue'

  export default {
    name: "DataData" // 多层数据模型
    , components: {DataDataL5}
    , props: {
      "data_data_pre_constraint": { // 数据模型层级前置约束
        type: Array,
        default: null, // 事先定义好数据
      },
    }
    , methods: {
      async constraint_by_pre() {

      }
    }
    , async created() {
      if (this.data_data_pre_constraint && this.data_data_pre_constraint.length > 0) { // 判断应用场景是否需要设置前置约束, 根据前置约束对查询数据进行约束 直接
        // 前置约束对应约束实际数据模型层
        return await this.constraint_by_pre();
      }
      this.data_data_pre_constraint = [];
    }
  }
</script>

<style scoped>

</style>
