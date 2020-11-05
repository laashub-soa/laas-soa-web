<template>
  <div>
    <router-view/>
    <DataBoardData
      :directory_id=directory_id
      directory_name="project_requirements" split_value="0"></DataBoardData>
  </div>
</template>

<script>
    import DataBoardData from "@/views/operate/operate/databoard/DataBoardData";

    export default {
        name: "project_requirements",
        components: {
            DataBoardData,
        },
        data() {
            return {
                directory_id: 10,
            }
        }
    }
</script>

<style scoped>

</style>
