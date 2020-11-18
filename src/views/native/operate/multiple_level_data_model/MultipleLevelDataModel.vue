<template>
  <div>
    <SingleLevelDataModel></SingleLevelDataModel>
  </div>
</template>

<script>
    import SingleLevelDataModel from '@/views/native/operate/multiple_level_data_model/SingleLevelDataModel.vue'

    export default {
        name: "MultipleLevelDataModel" // 多层数据模型
        , components: {SingleLevelDataModel}
        , props: {
            "data_model_level_pre_constraint": { // 数据模型层级前置约束
                type: Array,
                default: [{"24": [{"25": ["26"]}]}], // 事先定义好数据
            },
        }
        , methods: {}
        , created() {
            // 加载数据模型数据
        }
    }
</script>

<style scoped>

</style>
