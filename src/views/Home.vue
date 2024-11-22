<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="4">
        <!-- Total Views -->
        <el-card v-loading="loading">
          <div slot="header">Total Views</div>
          <h1>{{ visitRecordOverview.totalVisit }}</h1>
          <div>
            Today
            <i class="el-icon-top text-primary"></i>
            {{ visitRecordOverview.todayVisit }}
          </div>
        </el-card>
        <!-- New Creations -->
        <el-card class="mt-2">
          <div slot="header">New Creations</div>
          <el-row :gutter="8">
            <el-col :span="12">
              <el-button class="w-100" plain type="warning" @click="$router.push('/post/new')">
                <div><i class="icon-lg el-icon-tickets"></i></div>
                <div class="mt-2">Blog Posts</div>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="w-100" plain type="primary" @click="$router.push('/category/list')">
                <div><i class="icon-lg el-icon-folder"></i></div>
                <div class="mt-2">Categories</div>
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="8" class="mt-2">
            <el-col :span="12">
              <el-button class="w-100" plain type="primary" @click="$router.push('/photo/list')">
                <div><i class="icon-lg el-icon-picture-outline"></i></div>
                <div class="mt-2">Photos</div>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="w-100" plain type="primary" @click="notImpl">
                <div><i class="icon-lg fa fa-code"></i></div>
                <div class="mt-2">Snippets</div>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <!-- Quick Actions -->
        <el-card class="mt-2">
          <div slot="header">Quick Actions</div>
          <div>
            <el-button class="w-100" plain type="info" @click="notImpl">Batch Import Articles</el-button>
          </div>
          <div class="mt-2">
            <el-button class="w-100" plain type="info" @click="$router.push('post/upload')">Upload Post</el-button>
          </div>
          <div class="mt-2">
            <el-button class="w-100" plain type="info" @click="notImpl">Batch Import Images</el-button>
          </div>
          <div class="mt-2">
            <el-button class="w-100" plain type="info" @click="$router.push('/photo/list')">Upload Image</el-button>
          </div>
          <div class="mt-2">
            <el-button class="w-100" plain type="info" @click="notImpl">Export Data</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-row v-loading="loading" :gutter="8">
          <el-col :span="4">
            <el-card>
              <div slot="header">Post Count</div>
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
        <el-card v-loading="loading" class="mt-2">
          <div slot="header">Data Trends</div>
          <dv-charts :option="trendChartOption" :style="'height: 550px'" class="mt-2"/>
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
      overview: {},
      visitRecordOverview: {},
      trend: null,
      loadStage: 0
    }
  },
  computed: {
    trendChartOption() {
      let data = {}
      if (this.trend !== null) {
        data = {
          xAxis: {
            name: 'Date',
            data: this.trend.map(item => item.date),
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
            name: 'Views',
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
              data: this.trend.map(item => item.count),
              type: 'line',
              smooth: true,
              lineArea: {
                show: true,
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
              },
              label: {
                show: true,
                formatter: '{value} times'
              },
            }
          ]
        }
      }
      return data
    },
    loading() {
      return this.loadStage < 3
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$api.blog.overview()
        .then(res => {
          this.overview = null
          this.overview = res.data
          this.loadStage++
        })
        .catch(res => this.$message.error(`Failed to fetch! ${res.message}`))

      this.$api.visitRecord.getOverview()
        .then(res => {
          this.visitRecordOverview = null
          this.visitRecordOverview = res.data
          this.loadStage++
        })
        .catch(res => this.$message.error(`Failed to fetch visit statistics! ${res.message}`))

      this.$api.visitRecord.getTrend(14)
        .then(res => {
          this.trend = null
          this.trend = res.data
          this.loadStage++
        })
        .catch(res => this.$message.error(`Failed to fetch visit trends! ${res.message}`))
    },
    notImpl() {
      this.$message.warning('Function is under implementation!')
    }
  }
}
</script>

<style>
.icon-lg {
  font-size: 40px !important;
}

.el-card__header {
  padding: 8px 20px;
}
</style>
