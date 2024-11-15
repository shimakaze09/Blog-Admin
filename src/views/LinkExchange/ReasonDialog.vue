<template>
  <el-dialog title="Additional Information" :visible.sync="dialogFormVisible" width="30%">
    <el-form ref="uploadForm" :model="form" label-width="80px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="form.id" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Action" prop="action">
        <el-input v-model="form.action" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Reason" prop="reason">
        <el-input v-model="form.reason" autocomplete="off" placeholder="Enter approval/rejection reason"></el-input>
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
  name: "ReasonDialog",
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
      form: {
        id: 0,
        reason: '',
        action: ''
      },
    }
  },
  methods: {
    resetForm() {
      this.$refs.uploadForm.resetFields()
      this.form = { reason: '' }
    },
    show(id, action) {
      this.form.id = id
      this.form.action = action
      this.dialogFormVisible = true
    },
    close() {
      this.resetForm()
      this.dialogFormVisible = false
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return false
        this.$emit('addReason', this.form.id, this.form.action, this.form.reason)
        this.close()
      })
    },
  }
}
</script>
<style scoped></style>
