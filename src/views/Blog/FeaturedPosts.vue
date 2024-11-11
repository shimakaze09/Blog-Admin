<template>
  <el-row>
    <el-col :span="15">
      <el-table :data="tableData" :height="800" style="width: 100%;">
        <el-table-column prop="id" label="ID" width="50">
        </el-table-column>
        <el-table-column prop="post.id" label="Article ID" width="150">
        </el-table-column>
        <el-table-column prop="post.category.name" label="Article Category" width="250">
        </el-table-column>
        <el-table-column prop="post.title" label="Article Title" width="400" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Enter keyword to search" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="warning" plain @click="cancelFeatured(scope.$index, scope.row)">Cancel Featured
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "FeaturedPosts",
  data() {
    return {
      data: [],
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.data.filter(item =>
        !this.search || item.post.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$api.featuredPost.getAll()
        .then(res => this.data = res.data)
    },
    cancelFeatured(index, item) {
      this.$confirm('Are you sure?', 'Warning', { type: 'warning' })
        .then(() => {
          this.$api.featuredPost.deleteItem(item.id)
            .then(res => this.$message.success(`Operation successful. ${res.message}`))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
            .finally(() => this.loadData())
        })
        .catch(() => this.$message('Operation cancelled'))
    },
  }
}
</script>

<style scoped></style>
