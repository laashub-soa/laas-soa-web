<template>
  <div>
    <!--第一层第一个数据模型-->
    <div>
      <Directory ></Directory>
    </div>
  </div>
</template>

<script>
    import Directory from '@/components/directory/Directory.vue'

    export default {
        name: "SingleLevelSingleDataModel" // 单层单个数据模型
        , components: {Directory}
        ,methods:{
            async
        }
    }
</script>

<style scoped>

</style>
