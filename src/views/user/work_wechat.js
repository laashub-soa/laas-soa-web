let config = {
  app_id: "ww144549834d4c265e",
  agent_id: "1000006",
}

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

function login() {
  const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.href + '/rest/user/work_wechat/auth-redirect')
  const url = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=' + config.app_id + '&agentid=' + config.agent_id + '&redirect_uri=' + redirect_uri + '&state=STATE'
  openWindow(url, 'wechat', 540, 540)
}

export default {
  login
}
