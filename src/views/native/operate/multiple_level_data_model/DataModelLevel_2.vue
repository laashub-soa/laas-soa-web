<template>
  <div>
    <Directory @click-directory="OnClickDirectory" v-show="menu_active_name==item" :service_type="item"
               :is_databoard="is_databoard"
               :is_open_data="is_open_data"
               v-for="item in service_type_list"></Directory>
  </div>
</template>

<script>
  import Directory from '@/components/directory/Directory.vue'

  export default {
    name: "DataMoelLevel_2"
    , components: {
      Directory
    }
  }
</script>

<style scoped>

</style>
