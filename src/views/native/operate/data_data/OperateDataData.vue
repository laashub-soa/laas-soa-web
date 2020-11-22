<template>
  <div>
    <!--    <div v-for="item in data_data_pre_constraint"> &lt;!&ndash; 多列 &ndash;&gt;-->
    <!--      <div v-for="item in data_data_pre_constraint"> &lt;!&ndash; 多行 &ndash;&gt;-->
    <DataData :data_data_id="data_data_id"></DataData>
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import DataData from '@/views/native/operate/data_data/DataData.vue'

  export default {
    name: "OperateDataData" // 多层数据模型
    , components: {DataData}
    , props: {
      "data_data_pre_constraint": { // 数据模型层级前置约束
        type: Array,
        default: null, // 事先定义好数据
      },
    }
    , data() {
      return {
        data_data_id: 24
      }
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
