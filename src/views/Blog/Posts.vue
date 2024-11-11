<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="space-between">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input v-model="search" placeholder="Enter keyword" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="10">
            <!-- Category selection -->
            <!-- Add the attribute filterable to enable search functionality. By default, Select will find all options whose label property contains the input value. -->
            <el-select v-model="currentCategoryName" filterable placeholder="Select category"
              v-on:change="handleCategoryChange">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleSearchClick">Search</el-button>
          </el-col>
        </el-row>
        <div>
          <el-button @click="addPost">Add</el-button>
          <el-button type="danger" :disabled="!hasSelection">Delete</el-button>
          <el-button @click="toggleSelection()" :disabled="!hasSelection">Cancel Selection</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <!-- Fixed table header can be achieved by defining the height attribute in the el-table element. No additional code is required. -->
      <el-table ref="table" :data="posts" height="730" stripe style="width: 100%"
        @selection-change="handleSelectionChange" :default-sort="{ prop: 'lastUpdateTime', order: 'descending' }">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="status" label="Status" width="100" />
        <el-table-column prop="title" label="Title" sortable :show-overflow-tooltip="true" width="600">
        </el-table-column>
        <el-table-column prop="creationTime" label="Creation Time" sortable width="150">
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="Last Updated" sortable width="150">
        </el-table-column>
        <el-table-column prop="category.name" label="Category">
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="150">
          <template slot-scope="scope">
            <el-link type="info" @click="onItemEditClick(scope.row)">Edit</el-link>
            <el-link type="danger" @click="onItemDeleteClick(scope.row)">Delete</el-link>
            <el-dropdown @command="cmd => onItemDropdownClick(scope.row, cmd)">
              <el-button type="text" size="small">
                More<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="setFeatured">Set Featured</el-dropdown-item>
                <el-dropdown-item command="cancelFeatured">Cancel Featured</el-dropdown-item>
                <el-dropdown-item command="setTop">Set Top</el-dropdown-item>
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
      search: '',
      sortBy: null,
      posts: [],
      categories: [],
      currentCategoryId: 0,
      currentCategoryName: '',
      selectedPosts: [],
      hasSelection: false
    }
  },
  mounted() {
    // Load categories
    this.loadCategories()
    // Load blog posts
    this.loadBlogPosts()
  },
  methods: {
    dateTimeBeautify(dateTimeStr) {
      let dateObj = new Date(dateTimeStr)
      let dateStr = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`
      let timeStr = `${dateObj.getHours()}:${dateObj.getMinutes()}`
      return `${dateStr} ${timeStr}`
    },
    // Load categories
    loadCategories() {
      this.$api.category.getAll().then(res => {
        let categories = [{ id: 0, name: 'All' }]
        categories = categories.concat(res.data)
        this.categories = categories
      }).catch(res => this.$message.error(`Error loading category list: ${res.message}`))
    },
    // Load blog posts
    loadBlogPosts() {
      this.$api.blogPost.getList(
        this.currentCategoryId, this.search, this.sortBy,
        this.currentPage, this.pageSize
      ).then(res => {
        console.log(res)
        this.totalCount = res.pagination.totalItemCount
        this.posts = res.data
        this.posts.forEach(item => {
          item.creationTime = this.dateTimeBeautify(item.creationTime)
          item.lastUpdateTime = this.dateTimeBeautify(item.lastUpdateTime)
        })
      }).catch(res => this.$message.error(`Error fetching article list: ${res.message}`))
    },
    // Add post button
    addPost() {
      this.$router.push('/post/new')
    },
    // View button
    onItemEditClick(post) {
      this.$router.push(`/post/edit/${post.id}`)
    },
    // Delete button
    onItemDeleteClick(post) {
      this.$confirm('This operation will permanently delete the article. Are you sure?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$api.blogPost.deleteItem(post.id)
          .then(res => {
            this.$message.success(`Successfully deleted. ${res.message}`)
            this.loadBlogPosts()
          })
          .catch(res => this.$message.error(`Failed to operate. ${res.message}`))
          .finally(() => this.loadBlogPosts())
      }).catch(() => this.$message('Deletion cancelled'))
    },
    // Dropdown menu click
    onItemDropdownClick(post, command) {
      switch (command) {
        case 'setFeatured':
          this.$api.blogPost.setFeatured(post.id)
            .then(res => this.$message.success('Set Featured Successfully'))
            .catch(res => this.$message.error(`Failed to operate. ${res.message}`))
          break
        case 'cancelFeatured':
          this.$api.blogPost.cancelFeatured(post.id)
            .then(res => this.$message.success('Cancelled Featured Successfully'))
            .catch(res => this.$message.error(`Failed to operate. ${res.message}`))
          break
        case 'setTop':
          this.$api.blogPost.setTop(post.id)
            .then(res => this.$message.success(`Set Top Successfully. ${res.message}`))
            .catch(res => this.$message.error(`Failed to set top. ${res.message}`))
          break
      }
    },
    handleCategoryChange(categoryId) {
      this.currentCategoryId = categoryId
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loadBlogPosts()
    },
    handleCurrentPageChange(page) {
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
      this.selectedPosts = val
      this.hasSelection = this.selectedPosts.length > 0
    },
    handleSearchClick() {
      this.loadBlogPosts()
    },
  }
}
</script>

<style>
.el-header {
  text-align: left;
}
</style>
