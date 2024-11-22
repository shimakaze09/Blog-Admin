<template>
  <el-container>
    <el-header height="30px">
      <el-row justify="space-between" type="flex">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-input v-model="search" placeholder="Enter keyword" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="7">
            <!-- Category selection -->
            <!-- Add the attribute filterable to enable search functionality. By default, Select will find all options whose label property contains the input value. -->
            <el-select v-model="currentCategoryName" clearable filterable placeholder="Select category"
                       v-on:change="handleCategoryChange">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-select v-model="currentStatus" clearable filterable placeholder="Please select article status">
              <el-option v-for="item in statusList" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button @click="handleSearchClick">Search</el-button>
          </el-col>
        </el-row>
        <div>
          <el-button @click="addPost">Add</el-button>
          <el-button :disabled="!hasSelection" type="danger">Delete</el-button>
          <el-button :disabled="!hasSelection" @click="toggleSelection()">Cancel Selection</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <!-- Fixed table header can be achieved by defining the height attribute in the el-table element. No additional code is required. -->
      <el-table ref="table" :data="posts" :default-sort="{ prop: 'lastUpdateTime', order: 'descending' }" height="730" stripe
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"/>
        <el-table-column label="ID" prop="id" width="180"/>
        <el-table-column label="Article Status" prop="status" width="100"/>
        <el-table-column :show-overflow-tooltip="true" label="Title" prop="title" sortable width="600"/>
        <el-table-column label="Creation Time" prop="creationTime" sortable width="150"/>
        <el-table-column label="Last Updated" prop="lastUpdateTime" sortable width="150"/>
        <el-table-column label="Category" prop="category.name"/>
        <el-table-column fixed="right" label="Operations" width="150">
          <template slot-scope="scope">
            <el-link type="info" @click="onItemEditClick(scope.row)">Edit</el-link>
            <el-link type="danger" @click="onItemDeleteClick(scope.row)">Delete</el-link>
            <el-dropdown @command="cmd => onItemDropdownClick(scope.row, cmd)">
              <el-button size="small" type="text">
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
      <el-pagination :current-page="currentPage" :page-size="pageSize"
                     :page-sizes="[10, 20, 40, 60, 80, 100]" :total="totalCount" background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import * as utils from '@/utils/dateTime'

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
      statusList: [],
      currentCategoryId: 0,
      currentCategoryName: '',
      currentStatus: '',
      selectedPosts: [],
      hasSelection: false
    }
  },
  mounted() {
    // Load categories
    this.loadCategories()
    // Load blog posts
    this.loadBlogPosts()
    // Load article status list
    this.loadStatusList()
  },
  methods: {
    // Load categories
    loadCategories() {
      this.$api.category.getAll().then(res => {
        let categories = [{id: 0, name: 'All'}]
        categories = categories.concat(res.data)
        this.categories = categories
      }).catch(res => this.$message.error(`Error loading category list: ${res.message}`))
    },
    // Load blog posts
    loadBlogPosts() {
      this.$api.blogPost.getList(
        false, this.currentStatus,
        this.currentCategoryId, this.search, this.sortBy,
        this.currentPage, this.pageSize
      ).then(res => {
        console.log(res)
        this.totalCount = res.pagination.totalItemCount
        this.posts = res.data
        this.posts.forEach(item => {
          item.creationTime = utils.dateTimeBeautify(item.creationTime)
          item.lastUpdateTime = utils.dateTimeBeautify(item.lastUpdateTime)
        })
      }).catch(res => this.$message.error(`Error fetching article list: ${res.message}`))
    },
    // Load status list
    loadStatusList() {
      this.$api.blog.getStatusList().then(res => {
        this.statusList = res.data
      }).catch(res => this.$message.error(`Error loading status list: ${res.message}`))
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
