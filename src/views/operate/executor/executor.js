import axios from "axios";

// 执行器


/**
 * 执行业务
 * @param business_id
 * @param data_data_id
 * @returns {Promise<any>}
 */
async function execute_business(business_id, data_id, data_data_id) {
  let net_request_result = await axios.post("/rest/operate/executor/data/insert", {
    data_id: data_id,
    data_data_id: data_data_id,
    business_id: business_id,
  });
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

export default {
  execute_business
}
