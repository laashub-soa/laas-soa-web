const USER_STR = 'user'
const PAGE_PERMISSION_STR = 'page_permission'

export function get_user() {
  return JSON.parse(localStorage.getItem(USER_STR))
}

export function set_user(user) {
  return localStorage.setItem(USER_STR, JSON.stringify(user))
}

export function get_page_permission() {
  return JSON.parse(localStorage.getItem(PAGE_PERMISSION_STR))
}

export function set_role(page_permission) {
  return localStorage.setItem(PAGE_PERMISSION_STR, JSON.stringify(role))
}
