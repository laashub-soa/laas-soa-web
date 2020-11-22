<template>
  <div>

  </div>
</template>

<script>
  import DataModelLevel1 from '@/views/native/operate/data_data/DataDataL1.vue'

  export default {
    name: "DataData" // 多层数据模型
    , components: {DataModelLevel1}
    , props: {
      "data_model_level_pre_constraint": { // 数据模型层级前置约束
        type: Array,
        default: null, // 事先定义好数据
      },
    }
    , methods: {
      constraint_by_pre: function () {

      }
    }
    , async created() {
      if (this.data_model_level_pre_constraint && this.data_model_level_pre_constraint.length > 0) { // 判断应用场景是否需要设置前置约束, 根据前置约束对查询数据进行约束 直接
        // 前置约束对应约束实际数据模型层
        this.constraint_by_pre();
      }
      // 加载数据模型数据
    }
  }
</script>

<style scoped>

</style>
