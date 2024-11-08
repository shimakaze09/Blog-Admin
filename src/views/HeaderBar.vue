<template>
  <div class="header" :style="{ 'background': themeColor }"
    :class="collapse ? 'position-collapse-left' : 'position-left'">
    <!-- Navigation collapse -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor"
        mode="horizontal">
        <el-menu-item index="1" @click="onCollapse">
          <hamburger :isActive="collapse"></hamburger>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- Navigation Menu -->
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" :background-color="themeColor" text-color="#fff"
        active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">Home</el-menu-item>
        <el-menu-item index="2" @click="openWindow('https://github.com/shimakaze09')">Menu
          1</el-menu-item>
        <el-menu-item index="3" @click="openWindow('https://google.com')">Menu 2</el-menu-item>
      </el-menu>
    </span>
    <!-- Toolbar -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#14889A" :active-text-color="themeColor"
        mode="horizontal">
        <el-menu-item index="1">
          <!-- Theme switcher -->
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange">
          </theme-picker>
        </el-menu-item>
        <el-menu-item index="2" v-popover:popover-message>
          <!-- My Messages -->
          <el-badge :value="5" :max="99" class="badge" type="danger">
            <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-message" placement="bottom-end" trigger="click">
            <message-panel></message-panel>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="3" v-popover:popover-notice>
          <!-- System Notifications -->
          <el-badge :value="4" :max="99" class="badge" type="danger">
            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
            <notice-panel></notice-panel>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="4" v-popover:popover-personal>
          <!-- User Information -->
          <span class="user-info"><img :src="user.avatar" />{{ user.name }}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from "../components/Hamburger"
import ThemePicker from "../components/ThemePicker"
import NoticePanel from "./Core/NoticePanel"
import MessagePanel from "./Core/MessagePanel"
import PersonalPanel from "./Core/PersonalPanel"

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
      collapse: state => state.app.collapse
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
