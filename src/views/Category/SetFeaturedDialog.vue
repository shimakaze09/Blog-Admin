<template>
  <el-dialog title="Featured Category Information" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form">
      <el-form-item label="Featured Name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Icon Class Name" :label-width="formLabelWidth">
        <el-input v-model="form.iconCssClass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="submit">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SetFeaturedDialog",
  props: {
    category: {
      type: Object
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        description: '',
        iconCssClass: ''
      },
      formRules: {
        name: [
          { required: true, message: 'Please enter the featured name', trigger: 'blur' },
          { min: 1, max: 20, message: 'Length should be between 1 to 20 characters', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please enter a description', trigger: 'blur' },
          { min: 1, max: 300, message: 'Length should be between 1 to 300 characters', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    show() {
      console.log(this.category)
      this.dialogFormVisible = true
    },
    hide() {
      this.dialogFormVisible = false
    },
    close() {
      this.hide()
      this.$refs.form.resetFields()
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false

        this.$api.category.setFeatured(this.category.id, this.form)
          .then(res => {
            this.$message.success(`Operation successful. ${res.message}`)
            this.$emit('onAddPhotoSucceed')
          })
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          .finally(() => this.close())
      })
    },
  }
}
</script>

<style scoped></style>
