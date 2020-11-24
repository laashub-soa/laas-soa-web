<template>
  <div>
    <!--项目-->
    <!--父项目-项目-->
    <!--环境-->
    <!--路径-->
    <DataBoardData
      :directory_id="directory_id"
      :directory_name="directory_name" :split_value="split"
      :is_display_id_column="is_display_id_column"
      :is_display_search_area="is_display_search_area"
    ></DataBoardData>
  </div>
</template>

<script>
  import DataBoardData from "@/views/native/operate/DataBoardData";

  export default {
    name: "UpdateProjectConfigFile" // 修改项目配置文件
    , components: {
      DataBoardData,
    },
    data() {
      return {
        directory_id: 26,
        directory_name: '',
        split: 0.2,
        is_display_id_column: false,
        is_display_search_area: true,
      }
    }
  }
</script>

<style scoped>

</style>
