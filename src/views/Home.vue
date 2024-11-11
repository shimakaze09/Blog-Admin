<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="4">
        <!-- Total Reads -->
        <el-card>
          <div slot="header">Total Reads</div>
          <h1>10000</h1>
          <div>
            Today
            <i class="el-icon-top text-primary"></i>
            999
          </div>
        </el-card>
        <!-- New Creations -->
        <el-card class="mt-2">
          <div slot="header">New Creations</div>
          <el-row :gutter="8">
            <el-col :span="12">
              <el-button type="warning" plain class="w-100">
                <div><i class="icon-lg el-icon-tickets"></i></div>
                <div class="mt-2">Blogs</div>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" plain class="w-100">
                <div><i class="icon-lg el-icon-folder"></i></div>
                <div class="mt-2">Categories</div>
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="8" class="mt-2">
            <el-col :span="12">
              <el-button type="primary" plain class="w-100">
                <div><i class="icon-lg el-icon-picture-outline"></i></div>
                <div class="mt-2">Photos</div>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" plain class="w-100">
                <div><i class="icon-lg fa fa-code"></i></div>
                <div class="mt-2">Code Snippets</div>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <!-- Quick Operations -->
        <el-card class="mt-2">
          <div slot="header">Quick Operations</div>
          <div>
            <el-button type="info" plain class="w-100">Bulk Import Articles</el-button>
          </div>
          <div class="mt-2">
            <el-button type="info" plain class="w-100">Upload Article</el-button>
          </div>
          <div class="mt-2">
            <el-button type="info" plain class="w-100">Bulk Import Photos</el-button>
          </div>
          <div class="mt-2">
            <el-button type="info" plain class="w-100">Upload Photos</el-button>
          </div>
          <div class="mt-2">
            <el-button type="info" plain class="w-100">Export Data</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="8">
          <el-col :span="4">
            <el-card>
              <div slot="header">Article Count</div>
              <h1>{{ overview['postsCount'] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">Category Count</div>
              <h1>{{ overview['categoriesCount'] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">Photo Count</div>
              <h1>{{ overview['photosCount'] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">Featured Posts</div>
              <h1>{{ overview['featuredPostsCount'] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">Featured Categories</div>
              <h1>{{ overview['featuredCategoriesCount'] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">Featured Photos</div>
              <h1>{{ overview['featuredPhotosCount'] }}</h1>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="mt-2">
          <div slot="header">Data Trends</div>
          <dv-charts class="mt-2" :style="'height: 550px'" :option="option1" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      overview: null,
      option1: {
        xAxis: {
          name: 'First Week',
          data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          nameTextStyle: {
            fill: '#333',
            fontSize: 20
          },
          axisLabel: {
            style: {
              fill: '#333',
              fontSize: 16,
              rotate: 0
            }
          }
        },
        yAxis: {
          name: 'Reads',
          data: 'value',
          nameTextStyle: {
            fill: '#333',
            fontSize: 20
          },
          axisLabel: {
            style: {
              fill: '#333',
              fontSize: 16,
              rotate: 0
            }
          }
        },
        series: [
          {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'line'
          }
        ]
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$api.blog.overview()
        .then(res => {
          this.overview = res.data
        })
        .catch(res => this.$message.error(`Failed to fetch! ${res.message}`))
    }
  }
}
</script>

<style>
.icon-lg {
  font-size: 40px;
}
</style>
