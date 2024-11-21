<template>
  <div class="pb-5">
    <el-input v-model="postTitle" placeholder="Post Title"></el-input>

    <v-md-editor class="mb-3" v-model="postContent" :default-show-toc="true" :codemirror-style-reset="true"
      :disabled-menus="mode === 'edit' ? [] : ['image/upload-image']" @save="onEditorSave"
      @fullscreen-change="fullscreenChange" @upload-image="handleUploadImage" height="750px" />

    <el-form label-position="top" label-width="80px" :model="form" class="text-start mt-5">
      <el-form-item label="Post Options" prop="isPublish">
        <el-radio v-model="form.isPublish" :label="true">Publish</el-radio>
        <el-radio v-model="form.isPublish" :label="false">Save as Draft</el-radio>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="URL Slug (Friendly URL, only letters, numbers, hyphens, and underscores, up to 150 characters)"
            prop="slug">
            <el-input v-model="form.slug" maxlength="150" show-word-limit placeholder="Slug"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Category" prop="category">
            <el-cascader class="w-100" :options="categoryTree" :props="{
              checkStrictly: true,
              expandTrigger: 'hover',
              emitPath: false,
            }" v-model="form.category" filterable></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Summary" prop="summary">
        <el-input type="textarea" v-model="form.summary" :rows="8" maxlength="200" show-word-limit
          placeholder="Summary"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" plain @click="onSaveClick">Save</el-button>

  </div>
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
      postContent: '',
      post: null,
      categories: [],
      categoryTree: [],
      form: {
        isPublish: false,
        slug: '',
        summary: '',
        category: 0,
      }
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
            this.form.slug = this.post.slug
            this.form.isPublish = this.post.isPublish
            this.form.summary = this.post.summary
            this.form.category = this.post.categoryId
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

      this.$api.category.getNodes().then(res => this.categoryTree = mapNodes(res.data))
      this.$api.category.getAll().then(res => this.categories = res.data)
    },
    onEditorSave(text, html) {
      this.save()
    },
    onSaveClick() {
      this.save()
    },
    save() {
      let post = this.post
      post.title = this.postTitle
      post.content = this.postContent
      post.isPublish = this.form.isPublish
      post.slug = this.form.slug
      post.summary = this.form.summary
      post.categoryId = this.form.category

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
