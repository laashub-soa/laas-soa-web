<template>
  <div>
    <div id="wx_reg"></div>
  </div>
</template>

<script>
    import work_wechat from './work_wechat'

    require('./wwLogin-1.0.0.js');

    export default {
        name: "WorkWechatLogin", // 企业微信内嵌二维码登录方式
        async mounted() {
            const login_config = await work_wechat.get_config();
            let config = {
                app_id: login_config["app_id"],
                agent_id: login_config["agent_id"],
                redirect_uri: encodeURIComponent(location.protocol + "//" + location.host + '/rest/user/work_wechat/auth-redirect'),
                state: 'STATE',
            }
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
