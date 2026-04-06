<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    :height="800"
    style="width: 100%;">
    <el-table-column label="ID" prop="id" width="50">
    </el-table-column>
    <el-table-column label="Name" prop="name" width="250">
    </el-table-column>
    <el-table-column label="Parent Category" prop="parentId" width="130">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <add-category-dialog ref="addDialog" @onAddSucceed="onAddSucceed" @onUpdateSucceed="onUpdateSucceed"/>
        <el-input v-model="search" placeholder="Enter keyword to search" size="mini" style="width: 30%"/>
        <el-button icon="el-icon-circle-plus-outline" size="mini" @click="handleAdd">Add Category</el-button>
      </template>
      <template slot-scope="scope">
        <el-button plain size="mini" @click="handleEdit(scope.row)">Edit</el-button>
        <el-button plain size="mini" type="success" @click="setFeatured(scope.$index, scope.row)">
          Set Featured
        </el-button>
        <el-button plain size="mini" type="warning" @click="cancelFeatured(scope.$index, scope.row)">
          Cancel Featured
        </el-button>
        <el-button plain size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        <el-button v-if="scope.row.visible === true" plain size="mini" type="primary" @click="setInvisible(scope.row)">
          <i aria-hidden="true" class="fa fa-eye-slash fa-lg"></i>
        </el-button>
        <el-button v-if="scope.row.visible === false" plain size="mini" type="danger" @click="setVisible(scope.row)">
          <i aria-hidden="true" class="fa fa-eye fa-lg"></i>
        </el-button>
        <set-featured-dialog :ref="`setFeaturedDialog_${scope.$index}`" :category="scope.row"></set-featured-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import AddCategoryDialog from "@/views/Category/AddDialog.vue";
import SetFeaturedDialog from "./SetFeaturedDialog"
import AddLinkDialog from "@/views/Link/AddDialog.vue";

export default {
  name: "Categories",
  components: {
    AddLinkDialog,
    AddCategoryDialog,
    SetFeaturedDialog
  },
  data() {
    return {
      loading: false,
      data: [],
      search: ''
    }
  },
  computed: {
    tableData() {
      return this.data.filter(item =>
        !this.search || item.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      this.$api.category.getAll()
        .then(res => this.data = res.data)
        .catch(res => {
          console.error(res)
          this.$message.error(res.message)
        })
        .finally(() => this.loading = false)
    },
    handleAdd() {
      this.$refs.addDialog.add()
    },
    handleEdit(item) {
      this.$refs.addDialog.edit(item)
    },
    handleDelete(item) {
      this.$confirm('Are you sure you want to delete this category?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$api.category.deleteItem(item.id)
          .then(res => this.$message.success(`Deletion successful. ${res.message}`))
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          .finally(() => this.loadData())
      }).catch(() => this.$message('Deletion cancelled'))
    },
    onAddSucceed() {
      this.$message.success('Added successfully')
      this.loadData()
    },
    onUpdateSucceed() {
      this.$message.success('Saved successfully')
      this.loadData()
    },
    setFeatured(index, item) {
      this.$refs[`setFeaturedDialog_${index}`].show()
    },
    cancelFeatured(index, item) {
      this.$confirm('Are you sure?', 'Warning', {type: 'warning'})
        .then(() => {
          this.$api.category.cancelFeatured(item.id)
            .then(res => this.$message.success(`Operation successful. ${res.message}`))
            .catch(res => this.$message.error(`Operation failed. ${res.message}`))
        })
        .catch(() => this.$message('Operation cancelled'))
    },
    setVisible(item) {
      this.$api.category.setVisible(item.id)
        .then(res => this.$message.success(`Operation successful. ${res.message}`))
        .catch(res => this.$message.error(`Operation failed. ${res.message}`))
        .finally(() => this.loadData())
    },
    setInvisible(item) {
      this.$api.category.setInvisible(item.id)
        .then(res => this.$message.success(`Operation successful. ${res.message}`))
        .catch(res => this.$message.error(`Operation failed. ${res.message}`))
        .finally(() => this.loadData())
    }
  }
}
</script>

<style scoped></style>
