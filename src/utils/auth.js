import Cookies from "js-cookie";
import fa from "element-ui/src/locale/lang/fa";

/**
 * Check if logged in
 * @return boolean
 */
export const isLogin = () => {
  let token = Cookies.get('token')
  let userName = localStorage.getItem('user')

  if (!token || token.length === 0) return false
  if (!userName || userName.length === 0) return false
  return !isExpired();
}

/**
 * Check if login has expired
 * @return boolean
 */
export const isExpired = () => {
  let expiration = localStorage.getItem('expiration')
  if (expiration) {
    let now = new Date()
    let expirationTime = new Date(expiration)
    if (now > expirationTime) return true
  }

  return false
}

/**
 * Read saved token
 * @return string
 */
export const getToken = () => {
  return Cookies.get('token')
}

/**
 * Save login information
 * @param token Token
 * @param username Username
 * @param expiration Token expiration time
 */
export const login = (token, username, expiration) => {
  // Save token to Cookie
  Cookies.set('token', token)
  // Save login data to local storage
  localStorage.setItem('user', username)
  localStorage.setItem('expiration', expiration)
}

// Logout
export const logout = () => {
  Cookies.set('token', '')
  localStorage.removeItem('user')
  localStorage.removeItem('expiration')
}
