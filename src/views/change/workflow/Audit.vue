<template>
  <div>
    流程审核
  </div>
</template>

<script>
    export default {
        name: "audit", //工作流审批
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
