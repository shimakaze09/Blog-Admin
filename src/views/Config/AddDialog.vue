<template>
  <el-dialog :visible.sync="dialogFormVisible" title="Add Configuration" width="30%">
    <el-form ref="uploadForm" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="Key" prop="key">
        <el-input v-model="form.key" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Value" prop="value">
        <el-input v-model="form.value" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" autocomplete="off"></el-input>
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
  name: "AddConfigDialog",
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
        key: '',
        value: '',
        description: null
      },
      formRules: {
        key: [{required: true, message: 'Please enter key', trigger: 'blur'},],
        value: [{required: true, message: 'Please enter value', trigger: 'blur'}],
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.uploadForm.resetFields()
      this.form = {
        key: '',
        value: '',
        description: null
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
    edit(item) {
      this.mode = 'edit'
      this.form = item
      this.show()
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return false

        if (this.mode === 'add') {
          this.$api.config.add(this.form)
            .then(res => {
              if (res.successful) {
                this.$message({message: 'Configuration added successfully', type: 'success'})
                this.$emit('onAddSucceed')
                this.close()
              }
            })
            .catch(res => {
              this.$message({message: `Failed to add configuration! ${res.message}`, type: 'error'})
            })
        }

        if (this.mode === 'edit') {
          this.$api.config.update(this.form)
            .then(res => {
              if (res.successful) {
                this.$message({message: 'Configuration updated successfully', type: 'success'})
                this.$emit('onUpdateSucceed')
                this.close()
              }
            })
            .catch(res => {
              this.$message({message: `Failed to update configuration! ${res.message}`, type: 'error'})
            })
        }
      })
    },
  }
}
</script>

<style scoped></style>
