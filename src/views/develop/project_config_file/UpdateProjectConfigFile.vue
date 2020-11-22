<template>
  <div>
    <DataData :data_data_pre_constraint="data_data_pre_constraint"></DataData>
  </div>
</template>

<script>
  import DataData from '@/views/native/operate/data_data/DataData.vue'

  export default {
    name: "UpdateProjectConfigFile" // 修改项目配置文件
    , components: {
      DataData
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
