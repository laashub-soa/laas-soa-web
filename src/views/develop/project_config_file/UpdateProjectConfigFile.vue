<template>
  <div>
    <MultipleLevelDataModel :data_model_level_pre_constraint="data_model_level_pre_constraint"></MultipleLevelDataModel>
  </div>
</template>

<script>
    import MultipleLevelDataModel from '@/views/native/operate/multiple_level_data_model/MultipleLevelDataModel.vue'

    export default {
        name: "UpdateProjectConfigFile" // 修改项目配置文件
        , components: {
            MultipleLevelDataModel
        }
        , data() {
            return {
                data_model_level_pre_constraint: [{"24": [{"25": ["26"]}]}]
            }
        }
    }
</script>

<style scoped>

</style>
