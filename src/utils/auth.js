const TokenKey = 'access_token'

export function getToken () {
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
}

export function setToken (token) {
  sessionStorage.setItem(TokenKey, token)
}

export function removeToken () {
  sessionStorage.removeItem('access_token')
  localStorage.removeItem('access_token')
}
