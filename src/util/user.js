export function getUserInfo() {
  return JSON.parse(localStorage.getItem('user_info'))
}

export function removeUserInfo() {
  localStorage.removeItem('user_info')
}