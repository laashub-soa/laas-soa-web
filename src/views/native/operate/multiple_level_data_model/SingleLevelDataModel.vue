<template>
  <div>
    <SingleLevelSingleDataModel></SingleLevelSingleDataModel>
  </div>
</template>

<script>
    import SingleLevelSingleDataModel from '@/views/native/operate/multiple_level_data_model/SingleLevelSingleDataModel'

    export default {
        name: "SingleLevelDataModel" // 单层数据模型
        , components: {
            SingleLevelSingleDataModel
        }
    }
</script>

<style scoped>

</style>
