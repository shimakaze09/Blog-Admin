<template>
  <el-popover placement="bottom" width="200" trigger="custom" v-model="visible">
    <p>Image Name: {{ photo.title }}</p>
    <p>Location: {{ photo.location }}</p>
    <el-button-group>
      <el-button type="" icon="el-icon-edit"></el-button>
      <el-button type="" icon="el-icon-share"></el-button>
      <el-button type="" icon="el-icon-delete"></el-button>
    </el-button-group>
    <el-card slot="reference" :body-style="{ padding: '0px' }" style="margin: 5px;">
      <!-- Remove browser default events, add custom event -->
      <el-image :src="photo.url" class="image" :preview-src-list="[photo.url]"
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
      visible: false
    }
  },
  methods: {
    onImageRightClick() {
      this.visible = !this.visible
    },
  }
}
</script>

<style scoped></style>
