import {ExceptionlessClient} from 'exceptionless/dist/exceptionless';

const exLessClient = ExceptionlessClient.default;
exLessClient.config.apiKey = process.env.EXCEPTION_LESS_API_KEY

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
