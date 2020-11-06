<template>
  <div>
    <DesignerDataData
      :directory_id="directory_id"
      :directory_name="directory_name" :split_value="split"></DesignerDataData>
  </div>
</template>

<script>
    import DesignerDataData from "@/views/operate/operate/databoard/DataBoardData";

    export default {
        name: "Struct",
        components: {
            DesignerDataData,
        },
        data() {
            return {
                directory_id: 13,
                directory_name: '',
                split: 0.2
            }
        }
    }
</script>

<style scoped>

</style>
