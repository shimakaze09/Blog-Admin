<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
    class="demo-ruleForm login-container">
    <span class="tool-bar">
    </span>
    <h2 class="title">System Login</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="Account"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">Reset</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookies from "js-cookie"

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        username: 'admin',
        password: 'admin',
      },
      fieldRules: {
        username: [
          { required: true, message: 'Please enter username', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login() {
      this.loading = true
      let userInfo = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      }
      this.$api.auth.login(userInfo)
        .then(res => {  // Call login API
          if (res.successful) {
            Cookies.set('token', res.data.token) // Set token in Cookie
            localStorage.setItem('user', userInfo.username) // Save user to local storage
            this.$router.push('/')  // Redirect to home page after successful login
            this.$message({ message: 'Login Successful', type: 'success' })
          } else {
            this.$message({ message: `Login Failed: ${res.message}`, type: 'error' })
          }
          this.loading = false
        })
        .catch(err => {
          this.$message({ message: `Login Failed: ${err.message}`, type: 'error' })
          this.loading = false
        })
    },
    reset() {
      this.$refs.loginForm.resetFields()
    }
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
