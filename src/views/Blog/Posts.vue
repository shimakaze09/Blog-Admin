<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="space-between">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input placeholder="Please enter keywords" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="12">
            <!-- Category Filter -->
            <!-- Enable search functionality by adding filterable attribute to el-select -->
            <el-select v-model="currentCategoryName" filterable placeholder="Please select category"
              v-on:change="handleCategoryChange">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div>
          <el-button @click="addPost">Add</el-button>
          <el-button type="danger" :disabled="cancelSelectionBtnDisabled">Delete</el-button>
          <el-button @click="toggleSelection()" :disabled="cancelSelectionBtnDisabled">Cancel Selection</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <!-- Fixed table header can be achieved by setting height property on el-table element -->
      <el-table ref="table" :data="posts" height="730" stripe style="width: 100%"
        @selection-change="handleSelectionChange" :default-sort="{ prop: 'lastUpdateTime', order: 'descending' }">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="title" label="Title" sortable :show-overflow-tooltip="true" width="600">
        </el-table-column>
        <el-table-column prop="creationTime" label="Creation Time" sortable width="250">
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="Last Updated" sortable width="250">
        </el-table-column>
        <el-table-column prop="category.name" label="Category">
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="150">
          <template slot-scope="scope">
            <el-link type="info" @click="handleClick(scope.row)">View</el-link>
            <el-link type="danger">Delete</el-link>
            <el-dropdown>
              <el-button type="text" size="small">
                More<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Set Recommended</el-dropdown-item>
                <el-dropdown-item>Unset Recommended</el-dropdown-item>
                <el-dropdown-item>Set Top</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      currentCategoryName: '',
      multipleSelection: [],
      cancelSelectionBtnDisabled: true
    }
  },
  mounted() {
    // Load categories
    this.loadCategories()
    // Load blog posts
    this.loadBlogPosts()
  },
  methods: {
    loadCategories() {
      this.$api.category.getAll().then(res => {
        let categories = [{ id: 0, name: 'All' }]
        categories = categories.concat(res.data)
        this.categories = categories
      })
    },
    loadBlogPosts() {
      this.$api.blogPost.getList(this.currentCategoryId, this.currentPage, this.pageSize).then(res => {
        console.log(res)
        this.totalCount = res.pagination.totalItemCount
        this.posts = res.data
      })
    },
    addPost() {
      this.$message('Not implemented yet')
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
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
      this.cancelSelectionBtnDisabled = this.multipleSelection.length === 0
    }
  }
}
</script>

<style>
.el-header {
  text-align: left;
}
</style>
