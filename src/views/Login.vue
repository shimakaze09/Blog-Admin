<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
    class="demo-ruleForm login-container">
    <h2 class="title">System Login</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click="reset">Reset</el-button>
      <el-button type="primary" style="width:48%;" @click="login" :loading="loading">Log In</el-button>
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
        username: '',
        password: '',
      },
      fieldRules: {
        username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
        password: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
      },
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$api.auth.login(this.loginForm)
        .then(res => {  // Call login API
          // Save token to Cookie
          Cookies.set('token', res.data.token)
          // Save login data to local storage
          localStorage.setItem('user', this.loginForm.username)
          localStorage.setItem('expiration', res.data.expiration)
          // Redirect to home page on successful login
          this.$message.success('Login Successful')
          this.$router.push('/')
        })
        .catch(err => this.$message.error(`Login Failed: ${err.message}`))
        .finally(() => this.loading = false)
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
