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

/**
 * 思路参考: soa项目: docs/issue/关于二叉树排序.png
 */
function setup_index_menu_tree(original_tree_list) {
  // 1、按照pid进行排序数组
  const tree_result_1 = original_tree_list.sort(function (last, next) {
    if (last.pid > next.pid) {
      return 1;
    } else {
      return -1;
    }
    return 0;
  });
  // console.log("tree_result_1: ");
  // console.log(tree_result_1);
  // 2、按照pid进行归拢
  let tree_result_2 = {};
  for (const original_tree_index in tree_result_1) {
    let original_tree_item = tree_result_1[original_tree_index];
    const item_id = parseInt(original_tree_item["id"]);
    const item_pid = parseInt(original_tree_item["pid"]);
    if (!(item_pid in tree_result_2)) {
      tree_result_2[item_pid] = [item_id];
    } else {
      tree_result_2[item_pid].push(item_id);
    }
  }
  // console.log("tree_result_2: ");
  // console.log(tree_result_2);
  // 3、pid合并
  let tree_result_3 = {};
  const tree_result_2_keys = Object.keys(tree_result_2).sort(function (last, next) {
    if (parseInt(last) > parseInt(next)) return 1;
    else return -1;
    return 0;
  });
  for (let tree_result_2_key of tree_result_2_keys) {
    const tree_result_3_value = {};
    // 变幻数组为对象
    for (let tree_result_2_item of tree_result_2[tree_result_2_key]) {
      tree_result_3_value[tree_result_2_item] = {};
    }
    // 将值设置到对应位置
    const set_to_tree = function (cur_level_tree, pid, value) { // 设置值并返回是否设置值
      // 找
      // 单层判断
      if (pid in cur_level_tree) {
        cur_level_tree[pid] = value;
        return true;
      }
      // 多层深入
      for (let cur_level_tree_key in cur_level_tree) {
        let cur_level_tree_item = cur_level_tree[cur_level_tree_key];
        if (Object.keys(cur_level_tree_item).length < 1) continue;
        if (set_to_tree(cur_level_tree_item, pid, value)) {
          return true;
        }
      }
      return false;
    }
    if (!set_to_tree(tree_result_3, tree_result_2_key, tree_result_3_value)) {
      tree_result_3[tree_result_2_key] = tree_result_3_value;
    }
  }
  // console.log("tree_result_3: ");
  // console.log(tree_result_3);
  return tree_result_3;
}

function setup_page_menu_tree(index_menu_data, index_data) {
  const page_menu_tree = [];
  for (let index_menu_data_key in index_menu_data) {
    const index_menu_data_item = index_menu_data[index_menu_data_key];
    const index_data_item = index_data[index_menu_data_key];
    if (!index_data_item) {
      const next_page_menu_tree = setup_page_menu_tree(index_menu_data_item, index_data);
      console.log(next_page_menu_tree);
      page_menu_tree.push.apply(page_menu_tree, next_page_menu_tree);
      continue;
    }
    // 判断是否有子节点
    const cur_level_tree = {
      "id": parseInt(index_data_item["id"]),
      "pid": parseInt(index_data_item["pid"]),
      "name": index_data_item["name"],
      "description": index_data_item["name"],
      "addLeafNodeDisabled": true,
      "isLeaf": false,
    }
    if (Object.keys(index_menu_data).length > 0) {
      cur_level_tree["children"] = setup_page_menu_tree(index_menu_data_item, index_data);
    }
    page_menu_tree.push(cur_level_tree);
  }
  return page_menu_tree;
}

async function select_tree(service_type, request_data) {
  service_type = reset_service_type(service_type)
  let net_request_result = await axios.post(base_path + service_type + "/directory/select", request_data);
  if (!net_request_result || !net_request_result.status || net_request_result.status != 200 || !net_request_result.data) return;
  // 生成索引数据树
  const original_tree_list = net_request_result.data;
  console.log("original_tree_list: ");
  console.log(original_tree_list);
  const index_menu_tree = setup_index_menu_tree(original_tree_list);
  console.log("index_menu_tree: ");
  console.log(index_menu_tree);
  // 根据索引数据树生成界面数据树
  const index_data = {};
  for (let original_tree_list_item of original_tree_list) {
    index_data[parseInt(original_tree_list_item["id"])] = original_tree_list_item;
  }
  console.log("index_data: ");
  console.log(index_data);
  const page_menu_tree = setup_page_menu_tree(index_menu_tree, index_data);
  console.log("page_menu_tree: ");
  console.log(page_menu_tree);
  return page_menu_tree;
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
