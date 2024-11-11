import {ExceptionlessClient} from 'exceptionless/dist/exceptionless';

const exLessClient = ExceptionlessClient.default;
exLessClient.config.apiKey = '1L1zCqr7PW4JnKlpz7Lr4CgYIdLAf7CDn01TtxFM';

const install = Vue => {
  if (install.installed)
    return

  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $exLess: {
      get() {
        return exLessClient
      }
    }
  })
}

export default install
