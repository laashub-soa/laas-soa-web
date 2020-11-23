<template>
  <div>
    <DataBoardData
      :directory_id="directory_id"
      :directory_name="directory_name" :split_value="split"></DataBoardData>
  </div>
</template>

<script>
  import DataBoardData from "@/views/native/operate/DataBoardData";

  export default {
    name: "ConfigProjectEnv",
    components: {
      DataBoardData,
    },
    data() {
      return {
        directory_id: 28,
        directory_name: '',
        split: 0.2
      }
    }
  }
</script>
