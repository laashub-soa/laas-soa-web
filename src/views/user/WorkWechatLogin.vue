<template>
  <div>
    <div id="wx_reg"></div>
  </div>
</template>

<script>
    import work_wechat from './work_wechat'
    import {removeToken} from '@/utils/auth.js'

    require('./wwLogin-1.0.0.js');

    export default {
        name: "WorkWechatLogin", // 企业微信内嵌二维码登录方式
        async mounted() {
            const component = this;

            async function check_url() {
                const url = location.href;
                const url_params_str = url.substring(url.indexOf("?") + 1, url.indexOf("#"));
                console.log("url_params_str: " + url_params_str)
                const sub_index = url_params_str.indexOf("=")
                const param_key = url_params_str.substring(0, sub_index);
                const param_value = url_params_str.substring(sub_index + 1, url_params_str.length);
                if (param_key == "token") { // 登录成功
                    await component.$store.dispatch('user/login', param_value).then(() => {
                        component.$router.replace({path: '/'})
                    })
                } else { // 登录失败
                    removeToken()
                }
            }

            await check_url()

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
