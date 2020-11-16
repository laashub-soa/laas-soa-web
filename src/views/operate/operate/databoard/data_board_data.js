import axios from "axios";

const base_path = "/rest/native/cmdb/data"

async function select_(data_data) {
  let net_request_result = await axios.post(base_path + "/select", data_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function insert_(data_data) {
  let net_request_result = await axios.post(base_path + "/insert", data_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function update_(data_data) {
  let net_request_result = await axios.post(base_path + "/update", data_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function delete_(data_data) {
  let net_request_result = await axios.post(base_path + "/delete", data_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

export default {
  select_,
  insert_,
  update_,
  delete_,

}
