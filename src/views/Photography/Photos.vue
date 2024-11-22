<template>
  <el-container>
    <el-header height="30px">
      <el-row justify="start" type="flex">
        <div>
          <el-button @click="$refs.addPhotoDialog.show()">Add</el-button>
          <el-button type="danger">Bulk Delete</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <Waterfall :line-gap="300" :max-line-gap="400" :min-line-gap="250" :watch="photos" align="center">
        <waterfall-slot v-for="(photo, index) in photos" :key="photo.id" :height="photo.height" :order="index"
                        :width="photo.width" move-class="item-move">
          <photo-card :photo="photo" v-on:onItemDeleted="loadPhotos"></photo-card>
        </waterfall-slot>
      </Waterfall>
      <add-photo-dialog ref="addPhotoDialog" @onAddPhotoSucceed="onAddPhotoSucceed"></add-photo-dialog>
    </el-main>
    <el-footer height="30px">
      <!-- Pagination -->
      <el-pagination :current-page="currentPage" :page-size="pageSize"
                     :page-sizes="[10, 20, 40, 60, 80, 100]" :total="totalCount" background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import {baseUrl} from "@/utils/global"
import addPhotoDialog from "@/views/Photography/AddPhotoDialog"
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import PhotoCard from "@/components/PhotoCard";

export default {
  name: "Photos",
  components: {
    addPhotoDialog,
    Waterfall,
    WaterfallSlot,
    PhotoCard
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      totalCount: 1000,
      photos: [],
    }
  },
  mounted() {
    this.loadPhotos()
  },
  methods: {
    loadPhotos() {
      this.$api.photo.getList(this.currentPage, this.pageSize).then(res => {
        console.log(res)
        this.totalCount = res.pagination.totalItemCount
        this.photos = res.data.map(item => ({
          ...item,
          url: `${baseUrl}/media/photography/${item.id}.jpg`
        }))
      })
    },
    handlePageSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.loadPhotos()
    },
    handleCurrentPageChange(page) {
      console.log(page)
      this.currentPage = page
      this.loadPhotos()
    },
    onAddPhotoSucceed() {
      this.$message.success('Added successfully')
      this.loadPhotos()
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
