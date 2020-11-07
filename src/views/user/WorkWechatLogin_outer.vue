<template>
  <div>

  </div>
</template>

<script>
    import work_wechat from './work_wechat.js'

    export default {
        name: "WorkWechatLogin_outer",
        created() {
            work_wechat.login();
        }
    }
</script>

<style scoped>

</style>
