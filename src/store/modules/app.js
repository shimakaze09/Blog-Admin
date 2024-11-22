export default {
  state: {
    appName: "Blog Admin",  // Application Name
    themeColor: "#1993DFFF",  // Theme Color
    oldThemeColor: "#1993DFFF",   // Previous Theme Color
    collapse: false,  // Navigation bar collapse status
    menuRouteLoaded: false,    // Whether menu and routes have been loaded
    fullscreen: false,      // Fullscreen status
  },
  getters: {
    collapse(state) {   // Corresponds to the state above
      return state.collapse
    },
    fullscreen(state) {
      return state.fullscreen
    }
  },
  mutations: {
    // Toggle collapse state
    onCollapse(state) {
      state.collapse = !state.collapse
    },
    // Change theme color
    setThemeColor(state, themeColor) {
      state.oldThemeColor = state.themeColor
      state.themeColor = themeColor
    },
    // Update menu and route load status
    menuRouteLoaded(state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded;
    },
    // Toggle fullscreen mode
    onFullscreenChange(state) {
      state.fullscreen = !state.fullscreen
    }
  },
  actions: {}
}
