<template>
  <div class="message-panel">
    <div class="message-header">You have {{ data.length }} messages</div>
    <div class="message-content">
      <div v-for="item in data" :key="item.key" class="message-item">
        <div class="message-avatar">
          <img :src="require('@/assets/user.png')" class="avatar"/>
        </div>
        <span class="sender">
          {{ item.sender }}
        </span>
        <span class="time">
          <li class="fa fa-clock-o"></li> {{ item.time }}
        </span>
        <div class="message-cotent">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="message-footer">View all messages</div>
  </div>
</template>

<script>
export default {
  name: 'MessagePanel',
  props: {
    data: {
      type: Array,
      default: () => [
        {
          key: "1",
          avatar: '@/assets/user.png',
          content: 'You changed the user password',
          sender: 'User 1',
          time: '5 minutes ago'
        },
        {
          key: "2",
          avatar: '@/assets/user.png',
          content: 'You changed the user profile picture',
          sender: 'User 2',
          time: '2 hours ago'
        },
        {
          key: "3",
          avatar: '@/assets/user.png',
          content: '25 new members joined today',
          sender: 'User 3',
          time: 'Yesterday'
        },
        {
          key: "4",
          avatar: '@/assets/user.png',
          content: 'You published a new article',
          sender: 'User 4',
          time: 'Yesterday'
        },
        {
          key: "5",
          avatar: '@/assets/user.png',
          content: 'You published a new article',
          sender: 'User 5',
          time: 'Two days ago'
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
.message-panel {
  font-size: 15px;
  width: 300px;
  margin: -12px;
}

.message-header {
  padding-left: 10px;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.message-content {
  font-size: 15px;
}

.message-item {
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
  padding-top: 10px;
  padding-bottom: 10px;
}

.message-item:hover {
  cursor: pointer;
  background: #b1a6a61e;
}

.message-avatar {
  padding-left: 10px;
}

.avatar {
  margin-right: 10px;
}

.sender {
  font-size: 16px;
  font-weight: bold;
}

.time {
  font-size: 12px;
  float: right;
  padding-right: 10px;
}

.message-footer {
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
}

.message-footer:hover {
  cursor: pointer;
  background: #b1a6a61e;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 90px;
  float: left;
}
</style>
