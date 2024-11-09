<template>
  <el-dialog title="Upload Image" :visible.sync="dialogFormVisible" width="30%">
    <el-form ref="uploadForm" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="Image Name" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Location" prop="location">
        <el-input v-model="form.location" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-upload ref="upload" drag action="" :limit="1" accept="image/jpeg,image/png" :on-change="onUploadChange"
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drag files here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">Only JPG/PNG files are allowed, and they should not exceed 500KB</div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="submitUpload">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AddPhotoDialog",
  props: {
    onAddPhotoSucceed: {
      type: Function
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        location: '',
        file: null
      },
      formRules: {
        title: [
          { required: true, message: 'Please enter image title', trigger: 'blur' },
          { min: 1, max: 200, message: 'Length between 1 to 200 characters', trigger: 'blur' }
        ],
        location: [{ required: true, message: 'Please enter location', trigger: 'blur' }],
      }
    }
  },
  methods: {
    onUploadChange(file, fileList) {
      const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      if (!isIMAGE) {
        this.$message.error('Only JPG/PNG images are allowed!')
        return false
      }
      this.form.file = file
    },
    show() {
      this.dialogFormVisible = true
    },
    hide() {
      this.dialogFormVisible = false
    },
    close() {
      this.hide()
      this.$refs.uploadForm.resetFields()
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return false

        this.$api.photo.add(this.form.title, this.form.location, this.form.file.raw)
          .then(res => {
            if (res.successful) {
              this.$message({ message: 'Image uploaded successfully', type: 'success' })
              this.$emit('onAddPhotoSucceed')
              this.close()
            }
          })
      })
    },
  }
}
</script>

<style scoped></style>
