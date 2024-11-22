<template>
  <el-container>
    <el-header height="30px">
      <el-row justify="start" type="flex">
        <div>
          <el-button @click="handleAdd">Add</el-button>
          <add-link-dialog ref="addDialog" @onAddSucceed="onAddSucceed"
                           @onUpdateSucceed="onUpdateSucceed"></add-link-dialog>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table ref="table" :data="data" :default-sort="{ prop: 'time', order: 'descending' }" height="730" stripe
                style="width: 100%">
        <el-table-column type="selection" width="30"/>
        <el-table-column label="ID" prop="id" width="100"/>
        <el-table-column :show-overflow-tooltip="true" label="Name" prop="name"/>
        <el-table-column :show-overflow-tooltip="true" label="URL" prop="url"/>
        <el-table-column :show-overflow-tooltip="true" label="Description" prop="description"/>
        <el-table-column label="Visible" prop="visible">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.visible" size="medium">{{ scope.row.visible }}</el-tag>
            <el-tag v-else size="medium" type="danger">{{ scope.row.visible }}</el-tag>
          </template>
        </el-table-column>
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
import AddLinkDialog from "@/views/Link/AddDialog"

export default {
  name: "LinkList",
  components: {
    AddLinkDialog,
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
      this.$api.link.getAll()
        .then(res => this.data = res.data)
        .catch(res => this.$message.error(`Error fetching list: ${res.message}`))
    },
    handleAdd() {
      this.$refs.addDialog.show()
    },
    onItemEditClick(item) {
      this.$refs.addDialog.edit(item)
    },
    onItemDeleteClick(item) {
      this.$confirm('This action will delete the link, do you want to continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$api.link.deleteItem(item.id)
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
