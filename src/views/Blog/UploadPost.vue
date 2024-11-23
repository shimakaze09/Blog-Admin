<template>
  <el-row>
    <el-col :offset="8" :span="8">
      <el-form ref="uploadForm" :model="form" :rules="formRules" label-position="top" label-width="auto">
        <el-form-item label="Post Title" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Post Summary" prop="summary">
          <el-input v-model="form.summary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Post Category" prop="categoryId">
          <el-cascader v-model="form.categoryId" :options="categoriesTree" :props="{
                    checkStrictly:true,
                    expandTrigger: 'hover',
                    emitPath:false,
                 }" class="w-100" clearable
                       filterable
                       placeholder="Category Filter"></el-cascader>
        </el-form-item>
      </el-form>
      <el-form-item label="ZIP File Encoding" prop="zipEncoding">
        <el-select v-model="form.zipEncoding" class="w-100" clearable filterable placeholder="ZIP File Encoding">
          <el-option v-for="item in zipCodings" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-upload
        ref="upload"
        :auto-upload="false" :file-list="fileList" :on-change="onUploadChange"
        accept="application/x-zip-compressed,.zip"
        action=""
        class="w-100"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
        <div slot="tip" class="el-upload__tip">Only zip files can be uploaded</div>
      </el-upload>

      <el-row class="py-3" justify="end" type="flex">
        <el-button :loading="loading" type="primary" @click="submitUpload">Submit</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "UploadPost",
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      fileList: [],
      categoriesTree: [],
      zipCodings: ['utf-8', 'utf-16', 'gbk', 'gb2312'],
      form: {
        title: '',
        summary: '',
        categoryId: null,
        zipEncoding: 'utf-8',
        file: null
      },
      formRules: {
        title: [
          {required: true, message: 'Please enter the post title', trigger: 'blur'},
          {min: 1, max: 200, message: 'Length should be between 1 to 200 characters', trigger: 'blur'}
        ],
        summary: [{required: true, message: 'Please enter the post summary', trigger: 'blur'}],
        categoryId: [{required: true, message: 'Please select a post category', trigger: 'blur'}],
      }
    }
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    loadCategories() {
      const mapNodes = (nodes) => {
        let items = []
        if (!nodes) return null
        for (const node of nodes) {
          items.push({
            label: `${node.text} (${node.tags[0]})`,
            value: node.id,
            children: mapNodes(node.nodes)
          })
        }
        return items
      }

      this.$api.category.getNodes()
        .then(res => this.categoriesTree = mapNodes(res.data))
        .catch(res => this.$message.error(`Error loading category list: ${res.message}`))
    },
    onUploadChange(file, fileList) {
      console.log(file.raw.type)
      const isIMAGE = (file.raw.type === 'application/x-zip-compressed')
      if (!isIMAGE) {
        this.$message.error('Only zip files can be uploaded!')
        return false
      }

      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }

      this.form.file = file
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (!valid) return false

        this.loading = true

        this.$api.blog.upload(this.form.title, this.form.summary, this.form.categoryId, this.form.file.raw, this.form.zipEncoding)
          .then(res => {
            if (res.successful) {
              this.$message({message: 'Post uploaded successfully', type: 'success'})
              this.$router.push('/post/list')
            }
          })
          .catch(res => {
            this.$alert(res.message, 'Upload Failed', {
              confirmButtonText: 'OK',
              type: 'error'
            })
          }).finally(() => this.loading = false)
      })
    },
  }
}
</script>

<style lang="scss">
.el-upload {
  width: 100% !important;
}

.el-upload-dragger {
  width: 100% !important;
}
</style>
