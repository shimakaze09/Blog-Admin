<template>
  <div>
    <el-table
      ref="table"
      :data="data"
      :default-sort="{prop: 'time', order:'descending'}"
      stripe
      style="width: 100%">
      <el-table-column
        type="selection"
        width="30"/>
      <el-table-column
        label="IP Address"
        prop="ip"
        width="100"/>
      <el-table-column
        :show-overflow-tooltip="true"
        label="Request Path"
        prop="requestPath"
        sortable
      />
      <el-table-column
        label="Query Parameters"
        prop="requestQueryString"
        width="300"
      />
      <el-table-column
        label="HTTP Method"
        prop="requestMethod"
        sortable
        width="150"/>
      <el-table-column
        :show-overflow-tooltip="true"
        label="User Agent Information"
        prop="userAgent"
        sortable
        width="600"/>
      <el-table-column
        label="Time"
        prop="timeStr"
        sortable
        width="200"/>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 40, 60, 80, 100]"
      :total="totalCount"
      background
      class="py-3 text-center"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange">
    </el-pagination>
  </div>
</template>

<script>
import * as utils from '@/utils/dateTime'

export default {
  name: "VisitRecordList",
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      totalCount: 1000,
      search: '',
      sortBy: null,
      data: []
    }
  },
  mounted() {
    this.loadVisitRecord()
  },
  methods: {
    loadVisitRecord: function () {
      this.$api.visitRecord.getList(this.currentPage, this.pageSize)
        .then(res => {
          console.log(res)
          this.totalCount = res.pagination.totalItemCount
          this.data = res.data
          this.data.forEach(item => {
            item.timeStr = utils.dateTimeBeautify(item.time)
          })
        })
        .catch(res => this.$message.error(`Error fetching visit record list: ${res.message}`))
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loadVisitRecord()
    },
    handleCurrentPageChange(page) {
      this.currentPage = page
      this.loadVisitRecord()
    },
  }
}
</script>

<style scoped></style>
