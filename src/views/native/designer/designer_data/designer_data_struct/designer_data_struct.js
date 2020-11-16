import axios from "axios";

const base_path = "/rest/native/cmdb/struct"

async function select_(data_struct) {
  let net_request_result = await axios.post(base_path + "/select", data_struct);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function insert_(data_struct) {
  let net_request_result = await axios.post(base_path + "/insert", data_struct);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function update_(data_struct) {
  let net_request_result = await axios.post(base_path + "/update", data_struct);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function delete_(data_struct) {
  let net_request_result = await axios.post(base_path + "/delete", data_struct);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

export default {
  select_,
  insert_,
  update_,
  delete_,

}
