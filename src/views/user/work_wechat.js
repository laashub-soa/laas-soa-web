import axios from "axios";


async function select_login_config(data_data) {
  let net_request_result = await axios.get("/rest/user/work_wechat/select_login_config", data_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}


async function get_config() {
  const work_wechat_login_config_str = localStorage.getItem("work_wechat_login_config");
  if (work_wechat_login_config_str) {
    return JSON.parse(work_wechat_login_config_str);
  }
  const work_wechat_login_config = await select_login_config();
  localStorage.setItem("work_wechat_login_config", JSON.stringify(work_wechat_login_config));
  return work_wechat_login_config;
}

export default {
  get_config
}

