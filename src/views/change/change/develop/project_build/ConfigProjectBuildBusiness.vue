<template>
  <div>
    <DesignerDataData
      :directory_id="directory_id"
      :directory_name="directory_name" :split_value="split"></DesignerDataData>
  </div>
</template>

<script>
    import DesignerDataData from "@/views/native/operate/DataBoardData";

    export default {
        name: "ConfigDockerRepositoryData",
        components: {
            DesignerDataData,
        },
        data() {
            return {
                directory_id: 5,
                directory_name: '',
                split: 0.2
            }
        }
    }
</script>

<style scoped>

</style>
