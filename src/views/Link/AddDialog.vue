<template>
  <el-dialog :visible.sync="dialogFormVisible" title="Add Friend Link" width="30%">
    <el-form ref="uploadForm" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Visible" prop="visible">
        <el-switch v-model="form.visible"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="submitUpload">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AddLinkDialog",
  props: {
    onAddSucceed: {
      type: Function
    },
    onUpdateSucceed: {
      type: Function
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      mode: 'add',
      form: {
        name: '',
        url: '',
        description: null,
        visible: 1
      },
      formRules: {
        name: [{required: true, message: 'Please enter name', trigger: 'blur'}],
        url: [{required: true, message: 'Please enter URL', trigger: 'blur'}],
      }
    }
  },
  methods: {
    resetForm() {
      if (this.$refs.uploadForm) {
        this.$refs.uploadForm.resetFields()
      }
      this.form = {
        id: 0,
        name: '',
        url: '',
        description: null,
        visible: true
      }
    },
    show() {
      this.dialogFormVisible = true
    },
    hide() {
      this.dialogFormVisible = false
    },
    close() {
      this.resetForm()
      this.hide()
    },
    add() {
      this.mode = 'add'
      this.resetForm()
      this.show()
    },
    edit(item) {
      this.mode = 'edit'
      this.form = item
      this.show()
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return false

        if (this.mode === 'add') {
          this.$api.link.add(this.form)
            .then(res => {
              if (res.successful) {
                this.$message({message: 'Added successfully', type: 'success'})
                this.$emit('onAddSucceed')
                this.close()
              }
            })
            .catch(res => {
              this.$message({message: `Add failed! ${res.message}`, type: 'error'})
            })
        }

        if (this.mode === 'edit') {
          this.$api.link.update(this.form)
            .then(res => {
              if (res.successful) {
                this.$message({message: 'Updated successfully', type: 'success'})
                this.$emit('onUpdateSucceed')
                this.close()
              }
            })
            .catch(res => {
              this.$message({message: `Update failed! ${res.message}`, type: 'error'})
            })
        }
      })
    },
  }
}
</script>

<style scoped></style>
