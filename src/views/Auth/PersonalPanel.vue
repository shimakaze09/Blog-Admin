<template>
  <div class="personal-panel">
    <div :style="{ 'background': this.$store.state.app.themeColor }" class="personal-desc">
      <div class="avatar-container">
        <img :src="require('@/assets/user.png')" class="avatar"/>
      </div>
      <div class="name-role">
        <span class="sender">{{ user.name }} - {{ user.role }}</span>
      </div>
      <div class="register-info">
        <span class="register-info">
          <i class="fa fa-clock-o"></i>
          {{ user.registerInfo }}
        </span>
      </div>
    </div>
    <div class="personal-relation">
      <span class="relation-item">followers</span>
      <span class="relation-item">watches</span>
      <span class="relation-item">friends</span>
    </div>
    <div class="main-operation">
      <span class="main-operation-item">
        <el-button icon="fa fa-male" size="small"> Personal Center</el-button>
      </span>
      <span class="main-operation-item">
        <el-button icon="fa fa-key" size="small"> Change Password</el-button>
      </span>
    </div>
    <div class="other-operation">
      <div class="other-operation-item">
        <i class="fa fa-eraser"></i>
        Clear Cache
      </div>
      <div class="other-operation-item">
        <i class="fa fa-user"></i>
        Online Users
      </div>
      <div class="other-operation-item">
        <i class="fa fa-bell"></i>
        Visit Count
      </div>
      <div class="other-operation-item">
        <i class="fa fa-undo"></i>
        Backup Restore
      </div>
    </div>
    <div class="personal-footer" @click="logout">
      <i class="fa fa-sign-out"></i>
      Logout
    </div>
  </div>
</template>

<script>
import * as auth from '@/utils/auth'

export default {
  name: 'PersonalPanel',
  components: {},
  props: {
    user: {
      type: Object,
      default: {
        name: "admin",
        avatar: "@/assets/user.png",
        role: "Administrator",
        registeInfo: "Registration Time: 8/11/2024"
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // Log out
    logout: function () {
      this.$confirm("Are you sure to log out?", "Prompt", {
        type: "warning"
      }).then(() => {
        auth.logout()
        this.$router.push("/login")
      }).catch(() => {
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}

.personal-desc {
  padding: 15px;
  color: #fff;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}

.name-role {
  font-size: 16px;
  padding: 5px;
}

.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}

.relation-item {
  padding: 5px;
}

.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}

.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}

.main-operation-item {
  margin: 15px;
}

.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}

.other-operation-item {
  padding: 12px;
}

.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  color: rgb(19, 138, 156);
}

.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}

.personal-footer:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
  background: #b1a6a61e;
}
</style>
