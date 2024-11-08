<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="space-between">
        <el-row gutter="10">
          <el-col span="12">
            <el-input placeholder="Enter keyword" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col span="12">
            <!-- Category Filter -->
            <!-- Adding the filterable attribute to el-select enables search functionality. By default, Select will find options whose label contains the input value. -->
            <el-select v-model="currentCategoryName" filterable placeholder="Select category"
              v-on:change="handleCategoryChange">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div>
          <el-button>Add</el-button>
          <el-button type="danger">Delete</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <!-- Setting height on the el-table element allows fixed table headers without additional code. -->
      <el-table :data="posts" height="730" stripe style="width: 100%"
        :default-sort="{ prop: 'lastUpdateTime', order: 'descending' }">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="title" label="Title" sortable width="680">
        </el-table-column>
        <el-table-column prop="creationTime" label="Creation Time" sortable width="250">
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="Last Updated" sortable width="250">
        </el-table-column>
        <el-table-column prop="category.name" label="Category">
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">View</el-button>
            <el-button type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer height="30px">
      <!-- Pagination -->
      <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange"
        :current-page="currentPage" :page-sizes="[10, 20, 40, 60, 80, 100]" :page-size="pageSize" background
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Posts',
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      totalCount: 1000,
      posts: [],
      categories: [],
      currentCategoryId: 0,
      currentCategoryName: ''
    }
  },
  watch: {
    currentCategoryId: function (val, oldVal) {
      console.log(val, oldVal)
      this.loadBlogPosts()
    }
  },
  mounted() {
    // Load categories
    this.$api.category.getAll().then(res => {
      let categories = [{ id: 0, name: 'All' }]
      categories = categories.concat(res)
      this.categories = categories
    })
    // Load blog posts
    this.loadBlogPosts()
  },
  methods: {
    loadBlogPosts() {
      this.$api.blog.getList(this.currentCategoryId, this.currentPage, this.pageSize).then(res => {
        console.log(res)
        this.totalCount = res.pagination.totalItemCount
        this.posts = res.data
      })
    },
    handleClick(row) {
      console.log(row)
    },
    handleCategoryChange(categoryId) {
      console.log('categoryId', categoryId)
      this.currentCategoryId = categoryId
      this.loadBlogPosts()
    },
    handlePageSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.loadBlogPosts()
    },
    handleCurrentPageChange(page) {
      console.log(page)
      this.currentPage = page
      this.loadBlogPosts()
    }
  }
}
</script>

<style>
.el-header {
  text-align: left;
}
</style>
