<template>
  <div>
    <Operate :is_open_data="is_open_data"></Operate>
  </div>
</template>

<script>
    import Operate from "@/views/native/operate/Operate";

    export default {
        name: "OpenData",
        components: {Operate},
        data() {
            return {
                "is_open_data": true,
            }
        }
    }
</script>

<style scoped>

</style>
