<template>
  <!-- Only by defining the height attribute within the el-table element can a table with a fixed header be achieved, without needing any additional code. -->
  <el-table :data="posts" height="800" stripe style="width: 100%">
    <el-table-column prop="title" label="Title" width="800">
    </el-table-column>
    <el-table-column prop="creationTime" label="Creation Time">
    </el-table-column>
    <el-table-column prop="lastUpdateTime" label="Last Update Time">
    </el-table-column>
    <el-table-column prop="category.name" label="Category">
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">View</el-button>
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.$api.blog.getList()
      .then(res => {
        console.log(res)
        this.posts = res
      })
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
