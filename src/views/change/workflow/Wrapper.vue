<template>
  <div>
    工作流包装器
  </div>
</template>

<script>
    export default {
        name: "Wrapper", //工作流包装器, 对原有应用场景进行一键包装在流程中运作
        props: {
            service_name: { // 业务名称
                default: "",
                type: String,
            }
        }

    }
</script>

<style scoped>

</style>
