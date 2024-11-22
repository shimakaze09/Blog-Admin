<template>
  <el-container>
    <el-header height="30px">
      <el-row justify="start" type="flex">
        <div>
          <el-button @click="handleAdd">Add</el-button>
          <add-config-dialog ref="addConfigDialog" @onAddSucceed="onAddSucceed"
                             @onUpdateSucceed="onUpdateSucceed"></add-config-dialog>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table ref="table" :data="data" :default-sort="{ prop: 'time', order: 'descending' }" height="730" stripe
                style="width: 100%">
        <el-table-column type="selection" width="30"/>
        <el-table-column label="ID" prop="id" width="100"/>
        <el-table-column :show-overflow-tooltip="true" label="Key" prop="key"/>
        <el-table-column :show-overflow-tooltip="true" label="Value" prop="value"/>
        <el-table-column :show-overflow-tooltip="true" label="Description" prop="description"/>
        <el-table-column fixed="right" label="Actions" width="150">
          <template slot-scope="scope">
            <el-link type="info" @click="onItemEditClick(scope.row)">Edit</el-link>
            <el-link type="danger" @click="onItemDeleteClick(scope.row)">Delete</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import AddConfigDialog from "@/views/Config/AddDialog"

export default {
  name: "ConfigList",
  components: {
    AddConfigDialog,
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$api.config.getAll()
        .then(res => this.data = res.data)
        .catch(res => this.$message.error(`Error fetching config list: ${res.message}`))
    },
    handleAdd() {
      this.$refs.addConfigDialog.show()
    },
    onItemEditClick(item) {
      this.$refs.addConfigDialog.edit(item)
    },
    onItemDeleteClick(item) {
      this.$confirm('This action will delete the config item, do you want to continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$api.config.deleteItem(item.key)
          .then(res => this.$message.success(`Deleted successfully. ${res.message}`))
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
  }
}
</script>

<style scoped></style>
