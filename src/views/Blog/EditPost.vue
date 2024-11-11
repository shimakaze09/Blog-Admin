<template>
  <el-container>
    <el-header height="30px">
      <el-row :gutter="6">
        <el-col :span="3">
          <el-select v-model="postCategoryName" filterable placeholder="Please select a category"
            v-on:change="categoryChange">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <el-input v-model="postTitle" placeholder="Article title"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="warning" plain @click="onSummaryClick" :style="'width:100%'">Summary</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" plain @click="onSaveClick">Save</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <v-md-editor v-model="postContent" :default-show-toc="true" :codemirror-style-reset="true"
        :disabled-menus="mode === 'edit' ? [] : ['image/upload-image']" @save="onEditorSave"
        @fullscreen-change="fullscreenChange" @upload-image="handleUploadImage" height="750px" />
    </el-main>
  </el-container>
</template>

<script>
// TODO: Add a page close warning or auto-save feature

import VMdEditor from '@kangc/v-md-editor';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

VMdEditor.lang.use('en-US', enUS);

export default {
  name: "EditPost",
  data() {
    return {
      // Edit mode: new / edit
      mode: 'new',
      postTitle: '',
      postCategoryName: '',
      postCategoryId: 0,
      postContent: '',
      postSummary: '',
      post: null,
      categories: [],
    }
  },
  mounted() {
    this.init()
    this.loadCategories()
  },
  methods: {
    // Fullscreen toggle
    fullscreenChange(isFullscreen) {
      this.$store.commit('onFullscreenChange')
    },
    /**
     * Handle image upload
     * @param event Event object
     * @param insertImage Function to insert the image
     * @param files Array of selected files
     */
    handleUploadImage(event, insertImage, files) {
      let file = files[0]
      this.$api.blogPost.uploadImage(this.post.id, file)
        .then(res => {
          this.$message.success(`Added image: ${res.data.imgName}`)
          insertImage({
            url: res.data.imgUrl.replaceAll('\\', '/'),
            desc: res.data.imgName
          })
        })
        .catch(res => this.$message.error(`Failed to upload image. ${res.message}`))
    },
    // Category selection
    categoryChange(categoryId) {
      this.postCategoryId = categoryId
    },
    // Initialization
    init() {
      let id = this.$route.params.id
      if (id) {
        this.mode = 'edit'
        this.$api.blogPost.get(id)
          .then(res => {
            this.post = res.data
            this.postTitle = this.post.title
            this.postContent = this.post.content
            this.postSummary = this.post.summary
            this.postCategoryId = this.post.categoryId
            this.postCategoryName = this.post.category.name
            this.$notify.info({ title: 'Current mode: Edit article', message: `Loaded article: ${this.postTitle}` })
          })
          .catch(res => this.$message.error(`Failed to retrieve information. ${res.message}`))
      } else {
        this.mode = 'new'
        this.post = {}
        this.$notify.warning({
          title: 'Current mode: New Article',
          message: 'Note: You cannot upload images until after saving the article!'
        })
      }
    },
    loadCategories() {
      this.$api.category.getAll().then(res => this.categories = res.data)
    },
    onEditorSave(text, html) {
      this.save()
    },
    onSaveClick() {
      this.save()
    },
    onSummaryClick() {
      this.$prompt('Please enter the article summary', 'Prompt', {
        inputValue: this.postSummary
      })
        .then(({ value }) => {
          this.postSummary = value
          this.$notify.success(`Summary edited successfully: ${value}`)
        })
        .catch(() => this.$message.info('Input cancelled'));
    },
    save() {
      let post = this.post
      post.title = this.postTitle
      post.content = this.postContent
      post.summary = this.postSummary
      post.categoryId = this.postCategoryId

      if (this.mode === 'new') {
        this.$api.blogPost.add(post)
          .then(res => {
            this.$message.success(`Save successful. ${res.message}`)
            // Redirect to edit page after saving
            this.$router.push(`/post/edit/${res.data.id}`)
          })
          .catch(res => {
            console.log(res)
            this.$message.error(`Operation failed. ${res.message}`)
          })
      } else {
        this.$api.blogPost.update(post)
          .then(res => this.$message.success(`Saved successfully. ${res.message}`))
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
      }
    }
  }
}
</script>

<style lang="scss">
.v-md-editor {
  text-align: start;

  .codemirror-wrapper {
    .CodeMirror {
      font-size: 18px !important;
    }
  }
}
</style>
