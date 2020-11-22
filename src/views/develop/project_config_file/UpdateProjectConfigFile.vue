<template>
  <div>
    <OperateDataData :data_data_pre_constraint="data_data_pre_constraint"></OperateDataData>
  </div>
</template>

<script>
  import OperateDataData from '@/views/native/operate/data_data/OperateDataData.vue'

  export default {
    name: "UpdateProjectConfigFile" // 修改项目配置文件
    , components: {
      OperateDataData
    }
    , data() {
      return {
        data_data_pre_constraint: [{"24": [{"25": ["26"]}]}]
      }
    }
  }
</script>

<style scoped>

</style>
