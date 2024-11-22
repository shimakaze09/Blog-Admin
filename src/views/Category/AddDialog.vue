<template>
  <el-dialog :visible.sync="dialogFormVisible" title="Add Category" width="30%">
    <el-form ref="uploadForm" :model="form" :rules="formRules" label-position="left" label-width="80px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Parent" prop="parentId">
        <el-select v-model="form.parentId" placeholder="Please select">
          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
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
import {getAll} from "@/http/modules/category";

export default {
  name: "addCategoryDialog",
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
      categories: [],
      form: {
        name: '',
        url: '',
        description: null,
        visible: 1
      },
      formRules: {
        name: [{required: true, message: 'Please enter name', trigger: 'blur'},],
        parentId: [{required: true, message: 'Please enter parent category', trigger: 'blur'},],
        visible: [{required: true, message: 'Please enter visibility', trigger: 'blur'},],
      }
    }
  },
  created() {
    this.loadCategories()
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
    loadCategories() {
      getAll()
        .then(res => {
          this.categories = [
            {id: 0, name: '[Top Level Category]'},
            ...res.data
          ]
        })
        .catch(res => {
          this.$message({message: `${res.message}`, type: 'error'})
        })
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return false

        if (this.mode === 'add') {
          this.$api.category.add(this.form)
            .then(res => {
              if (res.successful) {
                this.$message({message: 'Added successfully', type: 'success'})
                this.$emit('onAddSucceed')
                this.close()
              }
            })
            .catch(res => {
              this.$message({message: `Failed to add! ${res.message}`, type: 'error'})
            })
        }

        if (this.mode === 'edit') {
          this.$api.category.update(this.form)
            .then(res => {
              if (res.successful) {
                this.$message({message: 'Updated successfully', type: 'success'})
                this.$emit('onUpdateSucceed')
                this.close()
              }
            })
            .catch(res => {
              this.$message({message: `Failed to update! ${res.message}`, type: 'error'})
            })
        }
      })
    },
  }
}
</script>

<style scoped></style>
