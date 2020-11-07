<template>
  <div>
    <!--企业微信内嵌二维码登录方式-->
    <script src="http://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js"></script>
  </div>
</template>

<script>
    let config = {
        app_id: "ww144549834d4c265e",
        agent_id: "1000006",
        redirect_uri: encodeURIComponent('xxx/redirect?redirect=' + window.location.href + '/rest/user/work_wechat/auth-redirect'),
        state: 'STATE',
    }
    export default {
        name: "WorkWechatLogin",
        created() {
            window.WwLogin({
                "id": "wx_reg",
                "appid": config.app_id,
                "agentid": config.agent_id,
                "redirect_uri": config.redirect_uri,
                "state": config.state,
                "href": "",
            });
        }
    }
</script>

<style scoped>

</style>
