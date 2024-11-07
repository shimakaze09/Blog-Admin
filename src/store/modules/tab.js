export default {
  state: {
    // Main entry tabs
    mainTabs: [],
    // Current active tab name
    mainTabsActiveName: ''
  },
  mutations: {
    updateMainTabs(state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName(state, name) {
      state.mainTabsActiveName = name
    }
  }
}
