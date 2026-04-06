<template>
  <div :class="collapse ? 'position-collapse-left' : 'position-left'"
       :style="{ 'background': themeColor, 'display': fullscreen ? 'none' : '' }"
       class="header">
    <!-- Navigation collapse -->
    <span class="hamburg">
      <el-menu :active-text-color="themeColor" :background-color="themeColor" class="el-menu-demo" mode="horizontal"
               text-color="#fff">
        <el-menu-item index="1" @click="onCollapse">
          <hamburger :isActive="collapse"></hamburger>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- Navigation Menu -->
    <span class="navbar">
      <el-menu :background-color="themeColor" :default-active="activeIndex" active-text-color="#ffd04b"
               class="el-menu-demo"
               mode="horizontal" text-color="#fff" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">Home</el-menu-item>
        <el-menu-item index="2" @click="openWindow('https://github.com/shimakaze09')">GitHub</el-menu-item>
      </el-menu>
    </span>
    <!-- Toolbar -->
    <span class="toolbar">
      <el-menu :active-text-color="themeColor" :background-color="themeColor" class="el-menu-demo" mode="horizontal"
               text-color="#14889A">
        <el-menu-item v-popover:popover-personal index="4">
          <!-- User Information -->
          <span class="user-info"><img :src="user.avatar"/>{{ user.name }}</span>
          <el-popover ref="popover-personal" :visible-arrow="false" placement="bottom-end" trigger="click">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Hamburger from "@/components/Hamburger"
import ThemePicker from "@/components/ThemePicker"
import NoticePanel from "./Auth/NoticePanel"
import MessagePanel from "./Auth/MessagePanel"
import PersonalPanel from "./Auth/PersonalPanel"

export default {
  name: "HeaderBar",
  components: {
    Hamburger,
    ThemePicker,
    NoticePanel,
    MessagePanel,
    PersonalPanel
  },
  data() {
    return {
      user: {
        name: "CodeLab",
        avatar: require("@/assets/user.png"),
        role: "Administrator",
        registerInfo: "Registered on 8/11/2024"
      },
      activeIndex: '1',
      langVisible: false
    }
  },
  methods: {
    openWindow(url) {
      window.open(url)
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // Collapse navigation bar
    onCollapse: function () {
      this.$store.commit('onCollapse')
    },
    // Switch theme
    onThemeChange: function (themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    },
  },
  mounted() {
    let user = localStorage.getItem("user")
    if (user) {
      this.user.name = user
      this.user.avatar = require("@/assets/star.png")
    }
  },
  computed: {
    ...mapState({
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse,
      fullscreen: state => state.app.fullscreen,
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}

.hamburg,
.navbar {
  float: left;
}

.toolbar {
  float: right;
}

.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}

.badge {
  line-height: 18px;
}

.position-left {
  left: 200px;
}

.position-collapse-left {
  left: 65px;
}
</style>
