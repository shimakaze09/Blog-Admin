<template>
  <el-popover v-model="visible" placement="bottom" trigger="manual" width="270">
    <p>Photo name: {{ photo.title }}</p>
    <p>Location: {{ photo.location }}</p>
    <p>Upload time: {{ dateTimeStr }}</p>
    <el-button-group>
      <el-button icon="el-icon-edit" type=""></el-button>
      <el-button icon="el-icon-check" type="warning" @click="setFeatured"></el-button>
      <el-button icon="el-icon-close" type="info" @click="cancelFeatured"></el-button>
      <el-button icon="el-icon-delete" type="danger" @click="deletePhoto"></el-button>
    </el-button-group>
    <el-card slot="reference" :body-style="{ padding: '0px' }" style="margin: 5px;">
      <!-- Remove default browser events, add custom event -->
      <el-image :preview-src-list="[photo.url]" :src="photo.url" class="image"
                @contextmenu.prevent="onImageRightClick"></el-image>
    </el-card>
  </el-popover>
</template>

<script>
export default {
  name: "PhotoCard",
  props: {
    photo: {
      type: Object
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    dateTimeStr() {
      let dt = new Date(this.photo.createTime)
      return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
    }
  },
  methods: {
    onImageRightClick() {
      this.visible = !this.visible
    },
    setFeatured() {
      this.$api.photo.setFeatured(this.photo.id)
        .then(res => this.$message.success('Successfully set featured'))
        .catch(res => this.$message.error(`Operation failed. ${res.message}`))
      this.onImageRightClick()
    },
    cancelFeatured() {
      this.$api.photo.cancelFeatured(this.photo.id)
        .then(res => this.$message.success('Successfully cancelled featured'))
        .catch(res => this.$message.error(`Operation failed. ${res.message}`))
      this.onImageRightClick()
    },
    deletePhoto() {
      this.$confirm('This operation will permanently delete the photo. Are you sure?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$api.photo.deleteItem(this.photo.id)
          .then(res => {
            this.$message.success(`Deleted successfully. ${res.message}`)
            // Delete completed, trigger item deleted event
            this.$emit('onItemDeleted')
          })
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
      }).catch(() => this.$message('Cancelling deletion'))
      this.onImageRightClick()
    }
  }
}
</script>

<style scoped></style>
