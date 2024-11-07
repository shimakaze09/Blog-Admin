<template>
  <div class="notice-panel">
    <div class="header">You have {{ data.length }} notifications</div>
    <div class="notice-content">
      <div v-for="item in data" :key="item.key" class="notice-item">
        <span class="notice-icon">
          <li :class="item.icon"></li>
        </span>
        <span class="notice-cotent">
          {{ item.content }}
        </span>
      </div>
    </div>
    <div class="notice-footer">View all notifications</div>
  </div>
</template>

<script>
export default {
  name: 'NoticePanel',
  props: {
    data: {
      type: Array,
      default: () => [
        {
          key: "1",
          icon: 'fa fa-envelope-o',
          content: 'You changed the user password'
        },
        {
          key: "2",
          icon: 'fa fa-music',
          content: 'You changed the user profile picture'
        },
        {
          key: "3",
          icon: 'fa fa-edit',
          content: '25 new members joined today'
        },
        {
          key: "4",
          icon: 'fa fa-edit',
          content: 'You published a new article'
        }]
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick: function () {
      // Button operation handling function
      this.$emit('click', {})
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.notice-panel {
  font-size: 15px;
  width: 250px;
  margin: -12px;
}

.header {
  padding-left: 10px;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.notice-content {
  font-size: 15px;
}

.notice-item {
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
  padding-top: 10px;
  padding-bottom: 10px;
}

.notice-item:hover {
  cursor: pointer;
  background: #b1a6a61e;
}

.notice-icon {
  padding-left: 10px;
  padding-right: 5px;
}

.notice-footer {
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
}

.notice-footer:hover {
  cursor: pointer;
  background: #b1a6a61e
}
</style>
