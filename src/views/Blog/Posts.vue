<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="space-between">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input placeholder="Enter keyword" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="12">
            <!-- Category selection -->
            <!-- Add the filterable attribute to el-select to enable search functionality. By default, Select will find options whose label contains the input value. -->
            <el-select v-model="currentCategoryName" filterable placeholder="Select category"
              v-on:change="handleCategoryChange">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div>
          <el-button @click="addPost">Add</el-button>
          <el-button type="danger" :disabled="!hasSelection">Delete</el-button>
          <el-button @click="toggleSelection()" :disabled="!hasSelection">Cancel selection</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <!-- Fixed table header can be achieved by defining height attribute on el-table element, without additional code. -->
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
            <el-link type="info" @click="onItemViewClick(scope.row)">Edit</el-link>
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
    // View button
    onItemViewClick(post) {
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
          .then(res => this.$message.success(`Deleted successfully. ${res.message}`))
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
        this.loadBlogPosts()
      }).catch(() => this.$message('Cancelling deletion'))
    },
    // Dropdown menu click
    onItemDropdownClick(post, command) {
      switch (command) {
        case 'setFeatured':
          this.$api.blogPost.setFeatured(post.id)
            .then(res => this.$message.success('Successfully set featured'))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          break
        case 'cancelFeatured':
          this.$api.blogPost.cancelFeatured(post.id)
            .then(res => this.$message.success('Successfully cancelled featured'))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          break
        case 'setTop':
          this.$api.blogPost.setTop(post.id)
            .then(res => this.$message.success(`Successfully set top. ${res.message}`))
            .catch(res => this.$message.error(`Failed to set top. ${res.message}`))
          break
      }
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
      this.selectedPosts = val
      this.hasSelection = this.selectedPosts.length > 0
    }
  }
}
</script>

<style>
.el-header {
  text-align: left;
}
</style>
