<template>
  <el-row>
    <el-col :span="9">
      <el-table :data="tableData" :height="800" style="width: 100%;">
        <el-table-column prop="id" label="ID" width="50">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="250">
        </el-table-column>
        <el-table-column prop="parentId" label="Parent Category" width="120">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Enter keyword to search" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="success" plain @click="setFeatured(scope.$index, scope.row)">Set Featured
            </el-button>
            <el-button size="mini" type="warning" plain @click="cancelFeatured(scope.$index, scope.row)">Cancel Featured
            </el-button>
            <set-featured-dialog :ref="`setFeaturedDialog_${scope.$index}`" :category="scope.row"></set-featured-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import SetFeaturedDialog from "./SetFeaturedDialog"

export default {
  name: "Categories",
  components: {
    SetFeaturedDialog
  },
  data() {
    return {
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
      this.$api.category.getAll()
        .then(res => {
          this.data = res.data
        })
    },
    setFeatured(index, item) {
      console.log(this.$refs)
      // console.log()
      this.$refs[`setFeaturedDialog_${index}`].show()
    },
    cancelFeatured(index, item) {
      this.$api.category.cancelFeatured(item.id)
        .then(res => this.$message.success(`Operation successful. ${res.message}`))
        .catch(res => this.$message.error(`Operation failed. ${res.message}`))
    },
  }
}
</script>

<style scoped></style>
