<template>
  <div>
    <reason-dialog ref="addReasonDialog" @addReason="addReason"></reason-dialog>
    <el-table ref="table" :data="data" :default-sort="{ prop: 'time', order: 'descending' }" stripe
              style="width: 100%">
      <el-table-column type="selection" width="30"/>
      <el-table-column label="ID" prop="id" width="100"/>
      <el-table-column :show-overflow-tooltip="true" label="Name" prop="name"/>
      <el-table-column :show-overflow-tooltip="true" label="Description" prop="description"/>
      <el-table-column :show-overflow-tooltip="true" label="URL" prop="url"/>
      <el-table-column :show-overflow-tooltip="true" label="Web Master" prop="webMaster"/>
      <el-table-column :show-overflow-tooltip="true" label="Email" prop="email"/>
      <el-table-column label="Verified" prop="verified">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.verified" size="medium">{{ scope.row.verified }}</el-tag>
          <el-tag v-else size="medium" type="danger">{{ scope.row.verified }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="Reason" prop="reason"/>
      <el-table-column :show-overflow-tooltip="true" label="Application Time" prop="applyTimeStr"/>
      <el-table-column fixed="right" label="Actions" width="150">
        <template slot-scope="scope">
          <el-link type="primary" @click="accept(scope.row)">Accept</el-link>
          <el-link type="info" @click="reject(scope.row)">Reject</el-link>
          <el-link type="danger" @click="onItemDeleteClick(scope.row)">Delete</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ReasonDialog from "@/views/LinkExchange/ReasonDialog.vue"
import * as utils from '@/utils/dateTime'
import AddLinkDialog from "@/views/Link/AddDialog.vue";

export default {
  name: "LinkExchangeList",
  components: {
    AddLinkDialog,
    ReasonDialog,
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
      this.$api.linkExchange.getAll()
        .then(res => {
          this.data = res.data
          this.data.forEach(item => {
            item.applyTimeStr = utils.dateTimeBeautify(item.applyTime)
          })
        })
        .catch(res => this.$message.error(`Error fetching list: ${res.message}`))
    },
    onItemDeleteClick(item) {
      this.$confirm('This action will delete the application. Do you want to continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$api.linkExchange.deleteItem(item.id)
          .then(res => this.$message.success(`Deleted successfully. ${res.message}`))
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          .finally(() => this.loadData())
      }).catch(() => this.$message('Deletion cancelled'))
    },
    addReason(id, action, reason) {
      console.log(id, action, reason)
      let promise = undefined
      if (action === 'accept') {
        promise = this.$api.linkExchange.accept(id, reason)
      } else if (action === 'reject') {
        promise = this.$api.linkExchange.reject(id, reason)
      }

      if (promise) {
        promise.then(res => this.$message.success('Operation successful'))
          .catch(res => this.$message.error(`Operation failed. ${res.message}`))
          .finally(() => this.loadData())
      }
    },
    accept(item) {
      this.$refs.addReasonDialog.show(item.id, 'accept')
    },
    reject(item) {
      this.$refs.addReasonDialog.show(item.id, 'reject')
    }
  }
}
</script>

<style scoped></style>
