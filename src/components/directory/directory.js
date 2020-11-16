import axios from "axios";

const base_path = "/rest/native" + "/"

function reset_service_type(service_type) {
  switch (service_type) {
    case "data":
      return "cmdb"
    case "logic":
      return "business"
  }
}

async function select_(service_type, directory) {
  service_type = reset_service_type(service_type)
  let net_request_result = await axios.post(base_path + service_type + "/directory/select", directory);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}


async function select_tree(service_type, request_data) {
  service_type = reset_service_type(service_type)
  let net_request_result = await axios.post(base_path + service_type + "/directory/select", request_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  // TODO 这里可以优化性能
  const original_tree_list = net_request_result.data.sort(function (a, b) {
    if (a.pid > b.pid) {
      return 1;
    } else {
      return -1;
    }
    return 0;
  });
  console.log("original_tree_list: " + JSON.stringify(original_tree_list));
  // adapter list to tree
  const name_str = "name";
  const description_str = "description";
  const children_str = "children";


  function setup_tree(pid) {
    const cur_tree_level = [];
    let i = original_tree_list.length;
    while (i--) {
      const originalTreeListElement = original_tree_list[i];
      if (originalTreeListElement["pid"] == pid) {
        original_tree_list.splice(i, 1);
        const next_tree_level = setup_tree(originalTreeListElement["id"]);
        const cur_tree_data = originalTreeListElement;
        cur_tree_data[name_str] = originalTreeListElement["name"];
        cur_tree_data[description_str] = originalTreeListElement[description_str];

        // tree element special attribution
        cur_tree_data["addLeafNodeDisabled"] = true; // disable the leaf
        cur_tree_data["isLeaf"] = false; // disable the leaf

        if (next_tree_level.length > 0) {
          cur_tree_data[children_str] = next_tree_level.reverse();
        }
        cur_tree_level.push(cur_tree_data);
      }
    }
    return cur_tree_level.reverse();
  }

  if (!original_tree_list || original_tree_list.length < 1) {
    return
  }
  return setup_tree(-1);
}

async function insert_(service_type, data_directory) {
  service_type = reset_service_type(service_type)
  let net_request_result = await axios.post(base_path + service_type + "/directory/insert", data_directory);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function update_(service_type, data_directory) {
  service_type = reset_service_type(service_type)
  let net_request_result = await axios.post(base_path + service_type + "/directory/update", data_directory);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

async function delete_(service_type, data_directory) {
  service_type = reset_service_type(service_type)
  let net_request_result = await axios.post(base_path + service_type + "/directory/delete", data_directory);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  return net_request_result.data;
}

export default {
  select_tree,
  select_,
  insert_,
  update_,
  delete_,

}
