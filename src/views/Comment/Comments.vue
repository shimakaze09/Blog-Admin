<template>
  <div>
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
        label="User Info"
      >
        <template v-slot="scope">
          <el-link type="text" @click="showUserInfo(scope.row)">{{ scope.row.anonymousUser.email }}</el-link>
        </template>
      </el-table-column>
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
        :show-overflow-tooltip="true"
        label="Supplementary Reason"
        prop="reason"/>
      <el-table-column
        label="Is Displayed"
        prop="visible"
      >
        <template v-slot="scope">
          <el-tag v-if="scope.row.visible" size="medium">Yes</el-tag>
          <el-tag v-else size="medium" type="danger">No</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Requires Audit"
        prop="isNeedAudit"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.isNeedAudit" size="medium">Yes</el-tag>
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
import {baseUrl} from '@/utils/global'

export default {
  name: "Comment",
  data() {
    return {
      data: [],
      postId: null,
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
      loading: false,
      isRefreshLoading: false,
      baseUrl: baseUrl,
      search: '',
      sortBy: null,
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$api.comment.getList(
          this.postId,
          this.search,
          this.sortBy,
          this.pagination.pageNumber,
          this.pagination.pageSize,
        )
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
      this.$prompt('Please enter the reason', 'Audit Comment - Additional Reason', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(({value}) => {
        this.$api.comment.accept(item.id, value)
          .then(res => {
            this.$message.success('Operation successful!')
          })
          .catch(res => {
            console.error(res)
            this.$message.warning(`Operation failed! ${res.message}`)
          })
          .finally(() => this.loadData())
      }).catch(() => {
      })
    },
    handleReject(item) {
      this.$prompt('Please enter the reason', 'Audit Comment - Additional Reason', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(({value}) => {
        this.$api.comment.reject(item.id, value)
          .then(res => {
            this.$message.success('Operation successful!')
          })
          .catch(res => {
            console.error(res)
            this.$message.warning(`Operation failed! ${res.message}`)
          })
          .finally(() => this.loadData())
      })
        .catch(() => {
        })
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
    showUserInfo(comment) {
      let user = comment.anonymousUser;
      const h = this.$createElement;
      this.$msgbox({
        title: 'User Information',
        message: h('div', null, [
          h('p', null, `ID: ${user.id}`),
          h('p', null, `Username: ${user.name}`),
          h('p', null, `Email: ${user.email}`),
          h('p', null, `Website: ${user.url}`),
          h('p', null, `IP Address: ${user.ip}`),
          h('p', null, `Creation Time: ${dateTimeBeautify(user.createdTime)}`),
          h('p', null, `User Agent Identifier: ${comment.userAgent}`),
        ]),
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  }
}
</script>

<style scoped></style>
