<template>
  <div class="container">
    <!-- Navigation Bar -->
    <navbar></navbar>
    <!-- Header Area -->
    <header-bar></header-bar>
    <!-- Main Content Area -->
    <main-content></main-content>
  </div>
</template>

<script>
import HeaderBar from "./HeaderBar"
import Navbar from "./Navbar"
import MainContent from "./MainContent"

export default {
  // name: 'Home',
  components: {
    HeaderBar,
    Navbar,
    MainContent
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
