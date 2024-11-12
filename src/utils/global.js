/**
 * Global constant and method encapsulation module
 * Mounted to Vue attributes via prototype
 * Called via this.Global
 */

// Backend management system server address
export const baseUrl = process.env.BASE_URL

export default {
  baseUrl
}
