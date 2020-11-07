<template>
  <div>
    <div id="wx_reg"></div>
  </div>
</template>

<script>
    require('./wwLogin-1.0.0.js');
    let config = {
        app_id: "ww144549834d4c265e",
        agent_id: "1000006",
        redirect_uri: encodeURIComponent(location.host + '/rest/user/work_wechat/auth-redirect'),
        state: 'STATE',
    }
    export default {
        name: "WorkWechatLogin", // 企业微信内嵌二维码登录方式
        mounted() {
            window.WwLogin({
                "id": "wx_reg",
                "appid": config.app_id,
                "agentid": config.agent_id,
                "redirect_uri": config.redirect_uri,
                "state": config.state,
                "href": "",
            });
        },
    }
</script>


<style scoped>

</style>
