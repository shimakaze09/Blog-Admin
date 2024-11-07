export default {
  state: {
    appName: "StarBlog",  // Application name
    themeColor: "#14889A",  // Theme color
    oldThemeColor: "#14889A",   // Previous theme color
    collapse: false,  // Navigation bar collapse state
    menuRouteLoaded: false    // Whether menu and routes have been loaded
  },
  getters: {
    collapse(state) {// Corresponding to the above state
      return state.collapse
    }
  },
  mutations: {
    onCollapse(state) {  // Change collapse state
      state.collapse = !state.collapse
    },
    setThemeColor(state, themeColor) {  // Change theme color
      state.oldThemeColor = state.themeColor
      state.themeColor = themeColor
    },
    menuRouteLoaded(state, menuRouteLoaded) {  // Change menu and route loading status
      state.menuRouteLoaded = menuRouteLoaded;
    }
  },
  actions: {}
}
