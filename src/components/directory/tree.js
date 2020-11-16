const moni_data = [{"id": 16, "pid": -1, "name": "program_language"}, {"id": 14, "pid": -1, "name": "host"}, {
  "id": 13,
  "pid": -1,
  "name": "workflow_struct"
}, {"id": 7, "pid": -1, "name": "project"}, {"id": 5, "pid": -1, "name": "git_server"}, {
  "id": 4,
  "pid": -1,
  "name": "docker_registry"
}, {"id": 2, "pid": 2, "name": "local_host"}, {"id": 3, "pid": 3, "name": "build_host"}, {
  "id": 19,
  "pid": 7,
  "name": "project_config_file"
}, {"id": 18, "pid": 7, "name": "project_deploy_env"}, {"id": 15, "pid": 7, "name": "host_build_config"}, {
  "id": 10,
  "pid": 9,
  "name": "project_requirements"
}, {"id": 9, "pid": 9, "name": "develop_process"}]

/**
 * 从tree对象中找到指定pid位置
 * @param cur_tree_level
 * @param pid
 * @returns {null|*|null}
 */
function set_to_tree(cur_tree_level, pid) {
  for (let cur_tree_level_key in cur_tree_level) {
    if (pid == cur_tree_level_key) {
      return cur_tree_level[pid]
    } else {
      const search_result = search_pid_in_tree(cur_tree_level[cur_tree_level[cur_tree_level_key]], pid);
      if (search_result) return search_result;
    }
  }
  return null;
}

/**
 * 思路参考: soa项目: docs/issue/关于二叉树排序.png
 */
function setup_tree(original_tree_list) {
  // 1、按照pid进行排序数组
  const tree_result_1 = original_tree_list.sort(function (last, next) {
    if (last.pid > next.pid) {
      return 1;
    } else {
      return -1;
    }
    return 0;
  });
  // 2、按照pid进行归拢
  console.log(original_tree_list);
  let tree_result_2 = {};
  for (const original_tree_index in original_tree_list) {
    let original_tree_item = original_tree_list[original_tree_index];
    const item_id = original_tree_item["id"];
    const item_pid = original_tree_item["pid"];
    if (!(item_pid in tree_result_2)) {
      tree_result_2[item_pid] = [item_id];
    } else {
      tree_result_2[item_pid].push(item_id);
    }
  }
  console.log(tree_result_2);

  // 3、pid合并

}

setup_tree(moni_data)
