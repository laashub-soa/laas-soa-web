<template>
  <div>
    <center>
      <!--    <WorkWechatLogin_outer></WorkWechatLogin_outer>-->
      <WorkWechatLogin></WorkWechatLogin>
    </center>
  </div>
</template>

<script>
    // import WorkWechatLogin_outer from "@/views/user/WorkWechatLogin_outer";
    import WorkWechatLogin from "@/views/user/WorkWechatLogin";

    export default {
        name: 'Login',
        components: {
            // WorkWechatLogin_outer
            WorkWechatLogin
        }
    }
</script>
