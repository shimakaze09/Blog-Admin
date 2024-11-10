<template>
  <div class="menu-bar-container">
    <!-- Logo -->
    <div class="logo" :style="{'background':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
         @click="$router.push('/')">
      <img v-if="collapse" src="@/assets/codelab.png"/>
      <div>{{ collapse ? '' : appName }}</div>
    </div>
    <!-- Navigation Menu -->
    <el-menu ref="navMenu" :default-active="$route.path" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
             :collapse="collapse" :collapse-transition="false" :unique-opened="false" router>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-submenu index="blog">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Blogs</span>
        </template>
        <el-menu-item-group title="Category Management">
          <el-menu-item index="/category/list">Category List</el-menu-item>
          <el-menu-item index="/category/featured">Featured Categories</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Article Management">
          <el-menu-item index="/post/list">Article List</el-menu-item>
          <el-menu-item index="/post/featured">Featured Articles</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="photography">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Photography</span>
        </template>
        <el-menu-item-group title="Photo Management">
          <el-menu-item index="/photo/list">Photo List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      appName: state => state.app.appName,
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse,
    }),
    mainTabs: {
      get() {
        return this.$store.state.tab.mainTabs
      },
      set(val) {
        this.$store.commit('updateMainTabs', val)
      }
    },
    mainTabsActiveName: {
      get() {
        return this.$store.state.tab.mainTabsActiveName
      },
      set(val) {
        this.$store.commit('updateMainTabsActiveName', val)
      }
    }
  },
  watch: {
    $route: 'handleRoute'
  },
  created() {
    this.handleRoute(this.$route)
  },
  methods: {
    // Route handling
    handleRoute(route) {
      // Tab selection, if not exists then add
      let tab = this.mainTabs.filter(item => item.name === route.name)[0]
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon
        }
        this.mainTabs = this.mainTabs.concat(tab)
      }
      this.mainTabsActiveName = tab.name
      // Update active menu when switching tabs
      if (this.$refs.navMenu != null) {
        this.$refs.navMenu.activeIndex = '' + route.meta.index
        this.$refs.navMenu.initOpenedMenu()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1020;

  .el-menu {
    position: absolute;
    top: 60px;
    bottom: 0;
    text-align: left;
  }

  .logo {
    position: absolute;
    top: 0;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 0;
      margin: 10px 10px 10px 10px;
      float: left;
    }

    div {
      font-size: 22px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }

  .menu-bar-width {
    width: 200px;
  }

  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>
