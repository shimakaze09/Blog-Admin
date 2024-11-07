<template>
  <div class="header" style="background:#14889A"
       :class="collapse?'position-collapse-left':'position-left'">
    <!-- Navigation collapse -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" background-color="#14889A" text-color="#fff" active-text-color="#14889A"
               mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
    <!-- Toolbar -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" background-color="#14889A" text-color="#14889A" active-text-color="#14889A"
               mode="horizontal">
        <el-menu-item index="1">
          <!-- User Information -->
          <span class="user-info"><img :src="user.avatar"/>{{ user.name }}</span>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Hamburger from "@/components/Hamburger"

export default {
  name: "HeaderBar",
  components: {
    Hamburger
  },
  data() {
    return {
      user: {
        name: "CodeLab",
        avatar: require("@/assets/star.png"),
        role: "Super Admin",
      },
      activeIndex: '1',
      langVisible: false
    }
  },
  methods: {
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // Collapse navigation bar
    onCollapse: function () {
      this.$store.commit('onCollapse')
    },
  },
  mounted() {
    let user = sessionStorage.getItem("user")
    if (user) {
      this.user.name = user
      this.user.avatar = require("@/assets/star.png")
    }
  },
  computed: {
    ...mapState({
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

.hamburg, .navbar {
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

.position-left {
  left: 200px;
}

.position-collapse-left {
  left: 65px;
}
</style>
