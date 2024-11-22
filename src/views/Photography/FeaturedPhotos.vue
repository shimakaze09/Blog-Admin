<template>
  <el-row v-if="featuredPhotos.length > 0" :gutter="10">
    <el-col v-for="fp in featuredPhotos" :key="fp.id" :span="4">
      <el-card :body-style="{ padding: '0px' }">
        <el-image :preview-src-list="[fp.photo.url]" :src="fp.photo.url" alt="" class="image"></el-image>
        <div style="padding: 14px;">
          <div>Image Title: {{ fp.photo.title }}</div>
          <div>Location: {{ fp.photo.location }}</div>
          <div style="margin-top: 3px;">
            <time class="time">{{ fp.photo.dateTimeStr }}</time>
          </div>
          <div class="bottom clearfix" style="margin-top: 3px;">
            <el-button-group>
              <el-button icon="el-icon-warning-outline" plain type="info" @click="notImpl">Not Implemented</el-button>
              <el-button icon="el-icon-edit" plain type="primary" @click="notImpl">Edit</el-button>
              <el-button icon="el-icon-delete" plain type="danger" @click="deleteItem(fp)">Delete</el-button>
            </el-button-group>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-empty v-else description="Featured Photos"></el-empty>
</template>

<script>
import {baseUrl} from "@/utils/global"

export default {
  name: "FeaturedPhotos",
  components: {},
  data() {
    return {
      featuredPhotos: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$api.featuredPhoto.getAll().then(res => {
        console.log(res)
        this.featuredPhotos = res.data
        this.featuredPhotos.forEach(item => {
          item.photo.url = `${baseUrl}/media/photography/${item.photo.id}.jpg`
          let dt = new Date(item.photo.createTime)
          item.photo.dateTimeStr = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
        })
        console.log('featuredPhotos', this.featuredPhotos)
      })
    },
    notImpl() {
      this.$message('Not implemented yet!')
    },
    deleteItem(featuredPhoto) {
      this.$confirm('This operation will delete this featured photo. Do you want to continue?', 'Warning', {type: 'warning'})
        .then(() => {
          this.$api.featuredPhoto.deleteItem(featuredPhoto.id)
            .then(res => this.$message.success(`Deleted successfully. ${res.message}`))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
            .finally(() => this.loadData())
        })
        .catch(() => this.$message('Delete cancelled'))
    }
  }
}
</script>

<style scoped></style>
