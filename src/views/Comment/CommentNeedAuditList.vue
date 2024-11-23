<template>
  <div>
    <audit-reason-dialog ref="auditReasonDialog" @onAccept="onAccept" @onReject="onReject"/>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      :default-sort="{prop: 'time', order:'descending'}"
      class="w-100"
      stripe>
      <el-table-column
        type="selection"
        width="30"/>
      <el-table-column
        :show-overflow-tooltip="true"
        label="ID"
        prop="id"/>
      <el-table-column
        :show-overflow-tooltip="true"
        label="Username"
        prop="anonymousUser.name"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        label="Email"
        prop="anonymousUser.email"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        label="Article"
      >
        <template v-slot="scope">
          <el-link :href="`${baseUrl}/Blog/Post/${scope.row.post.id}`" target="_blank">{{
              scope.row.post.title
            }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="Comment Time"
        prop="createdTime"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        label="Comment Content"
        prop="content"
      />
      <el-table-column
        label="Is Displayed"
        prop="visible"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.visible" size="medium">Yes</el-tag>
          <el-tag v-else size="medium" type="danger">No</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-button :loading="isRefreshLoading" size="mini" type="primary" @click="handleRefresh">Refresh</el-button>
        </template>
        <template slot-scope="scope">
          <el-link type="primary" @click="handleAccept(scope.row)">Approve</el-link>
          <el-link type="danger" @click="handleReject(scope.row)">Reject</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination -->
    <el-pagination
      :current-page="pagination.pageNumber"
      :page-size="pagination.pageSize"
      :page-sizes="[10, 20, 40, 60, 80, 100]"
      :total="pagination.totalItemCount"
      background
      class="py-3 text-center"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange">
    </el-pagination>
  </div>
</template>

<script>
import {dateTimeBeautify} from "@/utils/dateTime";
import AuditReasonDialog from '@/views/Comment/AuditReasonDialog.vue'
import {baseUrl} from '@/utils/global'

export default {
  name: "CommentNeedAuditList",
  components: {
    AuditReasonDialog,
  },
  data() {
    return {
      data: [],
      pagination: null,
      loading: false,
      isRefreshLoading: false,
      baseUrl: baseUrl
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$api.comment.getNeedAuditList()
          .then(res => {
            this.pagination = res.pagination
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
          .finally(() => this.loading = false)
      })
    },
    async handleRefresh() {
      this.isRefreshLoading = true
      await this.loadData()
      this.isRefreshLoading = false
    },
    handleAccept(item) {
      this.$refs.auditReasonDialog.accept(item.id)
    },
    onAccept(itemId, reason) {
      this.loading = true;

      this.$api.comment.accept(itemId, reason)
        .then(res => {
          this.$message.success('Operation successful!');
        })
        .catch(res => {
          console.error(res);
          this.$message.warning(`Operation failed! ${res.message}`);
        })
        .finally(() => this.loadData());
    },
    handleReject(item) {
      this.$refs.auditReasonDialog.reject(item.id)
    },
    onReject(itemId, reason) {
      this.loading = true
      this.$api.comment.reject(itemId, reason)
        .then(res => {
          this.$message.info('Operation successful!')
        })
        .catch(res => {
          console.error(res)
          this.$message.warning(`Operation failed! ${res.message}`)
        })
        .finally(() => this.loadData())
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
    handlePageSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.loadData()
    },
    handleCurrentPageChange(page) {
      this.pagination.pageNumber = page
      this.loadData()
    },
  }
}
</script>

<style scoped></style>
