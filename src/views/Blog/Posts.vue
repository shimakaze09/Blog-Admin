<template>
  <el-container>
    <el-header height="30px">
      <el-row justify="space-between" type="flex">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-input v-model="search" placeholder="Enter keyword" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="8">
            <el-cascader v-model="currentCategoryId" :options="categoriesTree" :props="{
                    checkStrictly:true,
                    expandTrigger: 'hover',
                    emitPath:false,
               }" class="w-100" clearable
                         filterable
                         placeholder="Category Filter"></el-cascader>
          </el-col>
          <el-col :span="3">
            <el-select v-model="currentStatus" clearable filterable placeholder="Article Tag">
              <el-option v-for="item in statusList" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="currentIsPublish" clearable placeholder="Article Status">
              <el-option :value="null" label="All"/>
              <el-option :value="true" label="Published"/>
              <el-option :value="false" label="Draft"/>
            </el-select>
          </el-col>
          <el-col :span="2">
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
      <el-table
        ref="table"
        v-loading="loading"
        :data="posts"
        :default-sort="{ prop: 'lastUpdateTime', order: 'descending' }"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"/>
        <el-table-column :show-overflow-tooltip="true" label="ID" prop="id"/>
        <el-table-column label="Article Status" prop="isPublish">
          <template v-slot="scope">
            <el-tag v-if="scope.row.isPublish">Published</el-tag>
            <el-tag v-else type="info">Draft</el-tag>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="Title" prop="title" sortable width="500">
          <template v-slot="scope">
            <el-link :href="`${baseUrl}/Blog/Post/${scope.row.id}`" target="_blank">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Article Mark"
          prop="status"/>
        <el-table-column label="Creation Time" prop="creationTime" sortable/>
        <el-table-column label="Last Updated" prop="lastUpdateTime" sortable/>
        <el-table-column label="Category" prop="category.name"/>
        <el-table-column fixed="right" label="Operations">
          <template v-slot="scope">
            <el-link type="info" @click="onItemEditClick(scope.row)">Edit</el-link>
            <el-link type="danger" @click="onItemDeleteClick(scope.row)">Delete</el-link>
            <el-dropdown @command="cmd => onItemDropdownClick(scope.row, cmd)">
              <el-button size="small" type="text">
                More<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu v-slot="dropdown">
                <el-dropdown-item command="setFeatured">Set Featured</el-dropdown-item>
                <el-dropdown-item command="cancelFeatured">Cancel Featured</el-dropdown-item>
                <el-dropdown-item command="setTop">Set Top</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 40, 60, 80, 100]"
                     :total="totalCount" background class="py-3 text-center"
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import * as utils from '@/utils/dateTime'
import {baseUrl} from "@/utils/global";

export default {
  name: 'Posts',
  data() {
    return {
      baseUrl: baseUrl,
      loading: false,
      currentPage: 1,
      pageSize: 20,
      totalCount: 1000,
      search: '',
      sortBy: null,
      posts: [],
      categoriesTree: [],
      statusList: [],
      currentCategoryId: 0,
      currentStatus: null,
      currentIsPublish: null,
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
      const mapNodes = (nodes) => {
        let items = []
        if (!nodes) return null
        for (const node of nodes) {
          items.push({
            label: `${node.text} (${node.tags[0]})`,
            value: node.id,
            children: mapNodes(node.nodes)
          })
        }
        return items
      }

      this.$api.category.getNodes()
        .then(res => this.categoriesTree = mapNodes(res.data))
        .catch(res => this.$message.error(`Error loading category list: ${res.message}`))
    },
    // Load blog posts
    loadBlogPosts() {
      this.loading = true
      this.$api.blogPost.getList(
        this.currentIsPublish, this.currentStatus,
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
        .finally(() => this.loading = false)
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
