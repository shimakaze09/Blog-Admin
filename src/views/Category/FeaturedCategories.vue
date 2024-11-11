<template>
  <el-table :data="tableData" :height="790" stripe style="width: 100%;">
    <el-table-column prop="id" label="ID" width="50">
    </el-table-column>
    <el-table-column prop="name" label="Featured Name" width="250">
    </el-table-column>
    <el-table-column prop="description" label="Featured Description" width="500" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="iconCssClass" label="Icon" width="200">
    </el-table-column>
    <el-table-column prop="category.id" label="Category ID" width="80">
    </el-table-column>
    <el-table-column prop="category.name" label="Category Name">
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
</template>

<script>
export default {
  name: "FeaturedCategories",
  data() {
    return {
      data: [],
      search: ''
    }
  },
  mounted() {
    this.loadData()
  },
  computed: {
    tableData() {
      return this.data.filter(item =>
        !this.search || item.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    loadData() {
      this.$api.featuredCategory.getAll()
        .then(res => this.data = res.data)
    },
    cancelFeatured(index, item) {
      this.$confirm('Are you sure?', 'Confirmation', { type: 'warning' })
        .then(() => {
          this.$api.featuredCategory.deleteItem(item.id)
            .then(res => this.$message.success(`Operation successful. ${res.message}`))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
            .finally(() => this.loadData())
        })
        .catch(() => this.$message('Operation cancelled'))
    }
  }
}
</script>

<style scoped></style>
