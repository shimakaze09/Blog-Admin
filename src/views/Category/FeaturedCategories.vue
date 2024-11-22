<template>
  <el-table :data="tableData" :height="790" stripe style="width: 100%;">
    <el-table-column label="ID" prop="id" width="50">
    </el-table-column>
    <el-table-column label="Featured Name" prop="name" width="250">
    </el-table-column>
    <el-table-column :show-overflow-tooltip="true" label="Featured Description" prop="description" width="500">
    </el-table-column>
    <el-table-column label="Icon" prop="iconCssClass" width="200">
    </el-table-column>
    <el-table-column label="Category ID" prop="category.id" width="120">
    </el-table-column>
    <el-table-column label="Category Name" prop="category.name">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" placeholder="Enter keyword to search" size="mini"/>
      </template>
      <template slot-scope="scope">
        <el-button plain size="mini" type="warning" @click="cancelFeatured(scope.$index, scope.row)">Cancel Featured
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
      this.$confirm('Are you sure?', 'Confirmation', {type: 'warning'})
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
