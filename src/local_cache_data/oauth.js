const TokenKey = 'soa_token'

export function get_token() {
  return localStorage.getItem(TokenKey)
}

export function set_token(token) {
  return localStorage.setItem(TokenKey, token)
}

export function remove_token() {
  return localStorage.removeItem(TokenKey)
}
