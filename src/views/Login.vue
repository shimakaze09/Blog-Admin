<template>
  <el-form ref="loginForm" :model="loginForm" :rules="fieldRules" class="demo-ruleForm login-container"
           label-position="left"
           label-width="0px">
    <div class="title h2">
      <h2>Blog</h2>
      <h4>Admin Login</h4>
    </div>
    <el-form-item prop="account">
      <el-input v-model="loginForm.username" auto-complete="off" placeholder="Username" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" auto-complete="off" placeholder="Password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-button class="w-100" plain type="warning" @click="reset">Reset</el-button>
        </el-col>
        <el-col :span="12">
          <el-button :loading="loading" class="w-100" type="primary" @click="login">Login</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import * as auth from '@/utils/auth'

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
        username: [{required: true, message: 'Please enter username', trigger: 'blur'}],
        password: [{required: true, message: 'Please enter password', trigger: 'blur'}]
      },
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$api.auth.login(this.loginForm)
        .then(res => {  // Call login API
          // Save login information
          auth.login(res.data.token, this.loginForm.username, res.data.expiration)

          // Login successful, redirect to homepage
          this.$message.success('Login Successful')
          this.$router.push('/')
        })
        .catch(err => this.$message.error(`Login failed: ${err.message}`))
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
