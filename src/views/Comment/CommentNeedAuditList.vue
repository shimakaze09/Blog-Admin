<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="start">
      </el-row>
    </el-header>
    <el-main>
      <el-table ref="table" :data="data" height="730" stripe style="width: 100%"
        :default-sort="{ prop: 'time', order: 'descending' }">
        <el-table-column type="selection" width="30" />
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="anonymousUser.name" label="Username" :show-overflow-tooltip="true" />
        <el-table-column prop="anonymousUser.email" label="Email" :show-overflow-tooltip="true" />
        <el-table-column prop="content" label="Comment Content" :show-overflow-tooltip="true" />
        <el-table-column prop="visible" label="Visible">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.visible">{{ scope.row.visible }}</el-tag>
            <el-tag size="medium" v-else type="danger">{{ scope.row.visible }}</el-tag>
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
export default {
  name: "CommentNeedAuditList",
  components: {},
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
      this.$api.comment.getNeedAuditList()
        .then(res => this.data = res.data)
        .catch(res => this.$message.error(`Error fetching list: ${res.message}`))
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
  }
}
</script>

<style scoped></style>
