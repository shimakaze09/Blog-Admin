<template>
  <div class="page-container">
    <!-- Toolbar -->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary"
            @click="findPage(null)" />
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add2" type="primary"
            @click="handleAdd" />
        </el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="Refresh" placement="top">
              <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
            </el-tooltip>
            <el-tooltip content="Column Display" placement="top">
              <el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>
            </el-tooltip>
            <el-tooltip content="Export" placement="top">
              <el-button icon="fa fa-file-excel-o"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
      <!-- Table Column Filter Dialog -->
      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
        @handleFilterColumns="handleFilterColumns">
      </table-column-filter-dialog>
    </div>
    <!-- Table Content Area -->
    <kt-table permsEdit="sys:user:edit" permsDelete="sys:user:delete" :data="pageResult" :columns="filterColumns"
      @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>
    <!-- Add/Edit Form -->
    <el-dialog :title="operation ? 'Add' : 'Edit'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
        label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Department" prop="deptName">
          <popup-tree-input :data="deptData" :props="deptTreeProps" :prop="dataForm.deptName"
            :nodeKey="'' + dataForm.deptId" :currentChangeHandle="deptTreeCurrentChangeHandle">
          </popup-tree-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Roles" prop="userRoles" v-if="!operation">
          <el-select v-model="dataForm.userRoles" multiple placeholder="Please select" style="width: 100%;">
            <el-option v-for="item in roles" :key="item.id" :label="item.remark" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
          {{ $t('action.submit') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput"
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"
import { format } from "@/utils/datetime"

export default {
  components: {
    PopupTreeInput,
    KtTable,
    KtButton,
    TableColumnFilterDialog
  },
  data() {
    return {
      size: 'small',
      filters: {
        name: ''
      },
      columns: [],
      filterColumns: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},

      operation: false, // true: Add, false: Edit
      dialogVisible: false, // Whether the add/edit form is displayed
      editLoading: false,
      dataFormRules: {
        name: [
          { required: true, message: 'Please enter username', trigger: 'blur' }
        ]
      },
      // Add/Edit Form Data
      dataForm: {
        id: 0,
        name: '',
        password: '123456',
        deptId: 1,
        deptName: '',
        email: 'test@qq.com',
        mobile: '13889700023',
        status: 1,
        userRoles: []
      },
      deptData: [],
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },
      roles: []
    }
  },
  methods: {
    // Get paginated data
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest
      }
      this.pageRequest.columnFilters = { name: { name: 'name', value: this.filters.name } }
      this.$api.blog.getList(0, 1, 12).then(res => {
        this.pageResult = res.data()
      }).then(data != null ? data.callback : '')
    },
    // Batch delete
    handleDelete: function (data) {
      // this.$api.user.batchDelete(data.params).then(data!= null? data.callback : '')
    },
    // Show add form
    handleAdd: function () {
      this.dialogVisible = true
      this.operation = true
      this.dataForm = {
        id: 0,
        name: '',
        password: '',
        deptId: 1,
        deptName: '',
        email: 'test@qq.com',
        mobile: '13889700023',
        status: 1,
        userRoles: []
      }
    },
    // Show edit form
    handleEdit: function (params) {
      this.dialogVisible = true
      this.operation = false
      this.dataForm = Object.assign({}, params.row)
      let userRoles = []
      for (let i = 0, len = params.row.userRoles.length; i < len; i++) {
        userRoles.push(params.row.userRoles[i].roleId)
      }
      this.dataForm.userRoles = userRoles
    },
    // Submit form
    submitForm: function () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('Do you want to submit?', 'Prompt', {}).then(() => {
            this.editLoading = true
            let params = Object.assign({}, this.dataForm)
            let userRoles = []
            for (let i = 0, len = params.userRoles.length; i < len; i++) {
              let userRole = {
                userId: params.id,
                roleId: params.userRoles[i]
              }
              userRoles.push(userRole)
            }
            params.userRoles = userRoles
            this.$api.user.save(params).then((res) => {
              this.editLoading = false
              if (res.code == 200) {
                this.$message({ message: 'Operation successful', type: 'success' })
                this.dialogVisible = false
                this.$refs['dataForm'].resetFields()
              } else {
                this.$message({ message: 'Operation failed,' + res.msg, type: 'error' })
              }
              this.findPage(null)
            })
          })
        }
      })
    },
    // Get department tree
    findDeptTree: function () {
      // this.$api.dept.findDeptTree().then((res) => {
      //   this.deptData = res.data
      // })
    },
    // Department tree selection
    deptTreeCurrentChangeHandle(data, node) {
      this.dataForm.deptId = data.id
      this.dataForm.deptName = data.name
    },
    // Date formatting
    dateFormat: function (row, column, cellValue, index) {
      return format(row[column.property])
    },
    // Handle table column filtering display
    displayFilterColumnsDialog: function () {
      this.$refs.tableColumnFilterDialog.setDialogVisible(true)
    },
    // Handle table column filtering display
    handleFilterColumns: function (data) {
      this.filterColumns = data.filterColumns
      this.$refs.tableColumnFilterDialog.setDialogVisible(false)
    },
    // Initialize columns
    initColumns: function () {
      this.columns = [
        { prop: "id", label: "ID", minWidth: 50 },
        { prop: "name", label: "Username", minWidth: 120 },
        { prop: "deptName", label: "Department", minWidth: 120 },
        { prop: "roleNames", label: "Roles", minWidth: 100 },
        { prop: "email", label: "Email", minWidth: 120 },
        { prop: "mobile", label: "Phone", minWidth: 100 },
        { prop: "status", label: "Status", minWidth: 70 },
        // {prop:"createBy", label:"Created By", minWidth:120},
        // {prop:"createTime", label:"Creation Time", minWidth:120, formatter:this.dateFormat}
        // {prop:"lastUpdateBy", label:"Updated By", minWidth:100},
        // {prop:"lastUpdateTime", label:"Last Updated Time", minWidth:120, formatter:this.dateFormat}
      ]
      this.filterColumns = JSON.parse(JSON.stringify(this.columns));
    }
  },
  mounted() {
    this.findDeptTree()
    this.initColumns()
  }
}
</script>

<style scoped></style>
