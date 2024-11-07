// Import all APIs
import api from './api'

const install = Vue => {
  if (install.installed)
    return;

  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    // Note: This property is mounted on the $api object of the Vue prototype
    $api: {
      get() {
        return api
      }
    }
  })
}

export default install
