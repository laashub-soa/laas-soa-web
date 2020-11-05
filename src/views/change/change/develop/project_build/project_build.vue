<template>
  <div>
    <router-view/>
    前置流程:
    <DataBoardData
      directory_id=11
      directory_name="project_build" split_value="0"></DataBoardData>
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
