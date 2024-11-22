<template>
  <el-container>
    <el-header height="30px">
      <el-row justify="start" type="flex">
        <el-button :loading="isRefreshLoading" @click="handleRefresh">Refresh</el-button>
      </el-row>
    </el-header>
    <el-main>
      <el-table ref="table" :data="data" :default-sort="{ prop: 'time', order: 'descending' }" height="730" stripe
                style="width: 100%">
        <el-table-column type="selection" width="30"/>
        <el-table-column :show-overflow-tooltip="true" label="id" prop="id"/>
        <el-table-column :show-overflow-tooltip="true" label="Username" prop="anonymousUser.name"/>
        <el-table-column :show-overflow-tooltip="true" label="Email" prop="anonymousUser.email"/>
        <el-table-column :show-overflow-tooltip="true" label="Comment Time" prop="createdTime"/>
        <el-table-column :show-overflow-tooltip="true" label="Comment Content" prop="content"/>
        <el-table-column label="Visible" prop="visible">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.visible" size="medium">{{ scope.row.visible }}</el-tag>
            <el-tag v-else size="medium" type="danger">{{ scope.row.visible }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" width="150">
          <template slot-scope="scope">
            <el-popover
              v-model="visible"
              placement="top"
              width="160">
              <p>This is a confirmation message. Are you sure you want to delete?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">Cancel</el-button>
                <el-button size="mini" type="primary" @click="visible = false">Confirm</el-button>
              </div>
              <el-link slot="reference">Delete</el-link>
            </el-popover>
            <el-link type="info" @click="handleAccept(scope.row)">Approve</el-link>
            <el-link type="danger" @click="handleReject(scope.row)">Reject</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {dateTimeBeautify} from "@/utils/dateTime";

export default {
  name: "CommentNeedAuditList",
  components: {},
  data() {
    return {
      data: [],
      isRefreshLoading: false,
      visible: false,
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      return new Promise((resolve, reject) => {
        this.$api.comment.getNeedAuditList()
          .then(res => {
            this.data = res.data
            this.data.forEach(e => {
              e.createdTime = dateTimeBeautify(e.createdTime)
              e.updatedTime = dateTimeBeautify(e.updatedTime)
            })
            resolve(res.data)
          })
          .catch(res => {
            this.$message.error(`Failed to fetch list: ${res.message}`)
            reject(res)
          })
      })
    },
    async handleRefresh() {
      this.isRefreshLoading = true
      await this.loadData()
      this.isRefreshLoading = false
    },
    handleAccept() {
    },
    handleReject() {
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
