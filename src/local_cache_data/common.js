export function set_cache(cache_data_id, cache_data) {
  localStorage.setItem(cache_data_id, JSON.stringify(cache_data));
}

export function get_cache(cache_data_id) {
  const cache_data_str = localStorage.getItem(cache_data_id);
  let cache_data = "";
  try {
    cache_data = JSON.parse(cache_data_str)
  } catch (e) {
    cache_data = cache_data_str; // 当格式化不了JSON时直接返回该字符串即可
  }
  return cache_data
}

export function remove_cache(cache_data_id) {
  localStorage.removeItem(cache_data_id)
}

export default {
  set_cache,
  get_cache,
  remove_cache,
}
