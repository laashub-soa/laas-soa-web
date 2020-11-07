<template>
  <div>

  </div>
</template>

<script>
    import work_wechat from './work_wechat'

    function openWindow(url, title, w, h) {
        // Fixes dual-screen position                            Most browsers       Firefox
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

        const left = ((width / 2) - (w / 2)) + dualScreenLeft
        const top = ((height / 2) - (h / 2)) + dualScreenTop
        const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus()
        }
    }

    async function login() {
        const login_config = await work_wechat.get_config();
        let config = {
            app_id: login_config["app_id"],
            agent_id: login_config["agent_id"],
            redirect_uri: encodeURIComponent(location.protocol + "//" + location.host + '/rest/user/work_wechat/auth-redirect'),
            state: 'STATE',
        }
        const url = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=' + config.app_id + '&agentid=' + config.agent_id + '&redirect_uri=' + config.redirect_uri + '&state=' + config.state
        openWindow(url, 'wechat', 540, 540)
    }

    export default {
        name: "WorkWechatLogin_outer",
        created() {
            login();
        }
    }
</script>

<style scoped>

</style>
