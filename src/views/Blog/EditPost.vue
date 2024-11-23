<template>
  <div class="pb-5">
    <el-breadcrumb class="my-3" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Blogs</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/post/list' }">Post Management</el-breadcrumb-item>
      <el-breadcrumb-item v-if="mode==='edit'">Edit Post</el-breadcrumb-item>
      <el-breadcrumb-item v-if="mode==='new'">New Post</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <div class="d-flex justify-content-between mb-1">
      <div>Title</div>
      <el-link target="_blank" type="primary">{{ `${baseUrl}/Blog/Post/${post.id}` }}</el-link>
    </div>
    <el-input v-model="postTitle" class="mb-3" placeholder="Article Title"></el-input>

    <div class="mb-1">Content</div>

    <v-md-editor v-model="postContent" :codemirror-style-reset="true" :default-show-toc="true"
                 :disabled-menus="mode === 'edit' ? [] : ['image/upload-image']"
                 class="mb-4" height="750px"
                 @save="onEditorSave" @fullscreen-change="fullscreenChange" @upload-image="handleUploadImage"/>

    <el-divider></el-divider>

    <el-descriptions :column="2" border title="Article Information">
      <el-descriptions-item label="Article ID">{{ post.id }}</el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag size="small">{{ post.status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Creation Time">{{ post.creationTime }}</el-descriptions-item>
      <el-descriptions-item label="Last Update Time">{{ post.lastUpdateTime }}</el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="left">Article Options</el-divider>

    <el-form :model="form" class="text-start" label-position="left" label-width="auto">
      <el-form-item label="Mode" prop="isPublish">
        <el-radio v-model="form.isPublish" :label="true">Publish</el-radio>
        <el-radio v-model="form.isPublish" :label="false">Save as Draft</el-radio>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Slug" prop="slug">
            <el-input v-model="form.slug" maxlength="150" placeholder="Slug" show-word-limit></el-input>
            <small>Friendly URL name, can only use letters, numbers, hyphens (-), underscores (_), and must not exceed
              150 characters</small>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Category" prop="category">
            <el-cascader :options="categoryTree" :props="{
              checkStrictly: true,
              expandTrigger: 'hover',
              emitPath: false,
            }" class="w-100" clearable filterable></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Summary" prop="summary">
        <el-input v-model="form.summary" :rows="8" maxlength="200" placeholder="Summary" show-word-limit
                  type="textarea"></el-input>
      </el-form-item>
    </el-form>

    <div class="text-end">
      <el-button :loading="saveButtonLoading" plain type="primary" @click="onSaveClick">Save</el-button>
    </div>

  </div>
</template>

<script>
// TODO: Add a page close warning or auto-save feature
import {baseUrl} from "@/utils/global";
import {dateTimeBeautify} from "@/utils/dateTime";

import VMdEditor from '@kangc/v-md-editor';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

VMdEditor.lang.use('en-US', enUS);

export default {
  name: "EditPost",
  data() {
    return {
      baseUrl: baseUrl,
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
      },
      saveButtonLoading: false,
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
            this.post.creationTime = dateTimeBeautify(this.post.creationTime)
            this.post.lastUpdateTime = dateTimeBeautify(this.post.lastUpdateTime)
            this.form.slug = this.post.slug
            this.form.isPublish = this.post.isPublish
            this.form.summary = this.post.summary
            this.form.category = this.post.categoryId
            this.$notify.info({title: 'Current mode: Edit article', message: `Loaded article: ${this.postTitle}`})
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

      this.saveButtonLoading = true

      if (this.mode === 'new') {
        this.$api.blogPost.add(post)
          .then(res => {
            this.$message.success(`Save successful.`)
            // Redirect to edit page after saving
            this.$router.push(`/post/edit/${res.data.id}`)
          })
          .catch(res => {
            console.log(res)
            this.$message.error(`Operation failed. ${res.message}`)
          })
          .finally(() => this.saveButtonLoading = false)
      } else {
        this.$api.blogPost.update(post)
          .then(res => this.$message.success(`Saved successfully.`))
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          .finally(() => this.saveButtonLoading = false)
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
