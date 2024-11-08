<template>
  <div class="page-container" style="width:99%;margin-top:15px;">
    <el-carousel :interval="3000" type="card" height="550px" class="carousel">
      <el-carousel-item class="carousel-item-intro">
        <h2>Project Introduction</h2>
        <ul>
          <li>Based on Spring Boot, Spring Cloud, Vue, Element, Java EE rapid development platform</li>
          <li>Aims to provide a concise and easy-to-use solution to help users effectively reduce project development difficulty and cost</li>
          <li>The blog provides synchronous tutorial articles for the development process, teaching you how to develop similar systems step by step</li>
        </ul>
        <div><img src="@/assets/user.png" alt=""/></div>
      </el-carousel-item>
      <el-carousel-item class="carousel-item-func">
        <h2>Function Plan</h2>
        <ul>
          <li>Core framework: Spring Boot 2.x. Service governance: Spring Cloud.</li>
          <li>View framework: Spring MVC 5.x. Persistence layer framework: MyBatis 3.x.</li>
          <li>Database connection pool: Druid 1.x. Security framework: Shiro 1.4.x.</li>
          <li>Front-end framework: Vue.js 2.x. Page components: Element 2.x.</li>
          <li>Status management: Vuex.js 2.x. Backend interaction: axios 0.18.x.</li>
          <li>...</li>
        </ul>
        <div><img src="@/assets/codelab.png" alt=""></div>
      </el-carousel-item>
      <el-carousel-item class="carousel-item-env">
        <h2>Development Environment</h2>
        <ul>
          <li>Core framework: Spring Boot 2.x. Service governance: Spring Cloud.</li>
          <li>View framework: Spring MVC 5.x. Persistence layer framework: MyBatis 3.x.</li>
          <li>Database connection pool: Druid 1.x. Security framework: Shiro 1.4.x.</li>
          <li>Front-end framework: Vue.js 2.x. Page components: Element 2.x.</li>
          <li>Status management: Vuex.js 2.x. Backend interaction: axios 0.18.x.</li>
          <li>...</li>
        </ul>
        <div><img src="@/assets/star.png" alt=""></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {}
}
</script>

<style>
.carousel {
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 20px;
}

.carousel img {
  width: 200px;
  height: 200px;
  padding-top: 15px;
}

.carousel h2 {
  color: #475669;
  font-size: 22px;
  opacity: 1.75;
  line-height: 100px;
  margin: 0;
}

.carousel ul {
  color: #475669;
  font-size: 15px;
  opacity: 1.75;
  line-height: 40px;
  margin: 0;
}

.carousel-item-intro h2 {
  color: #ffffff;
  font-size: 22px;
  opacity: 1.75;
  line-height: 80px;
  margin: 0;
}

.carousel-item-intro ul {
  color: #ffffff;
  font-size: 15px;
  opacity: 1.75;
  line-height: 65px;
  padding: 5px;
  margin: 0;
}

.carousel-item-func h2 {
  color: #3f393b;
  font-size: 22px;
  opacity: 1.75;
  line-height: 50px;
  margin: 0;
}

.carousel-item-func ul {
  color: #3f393b;
  font-size: 15px;
  opacity: 1.75;
  line-height: 30px;
  text-align: left;
  padding-left: 90px;
  margin: 0;
}

.carousel-item-env h2 {
  color: #475669;
  font-size: 22px;
  opacity: 1.75;
  line-height: 50px;
  margin: 0;
}

.carousel-item-env ul {
  color: #475669;
  font-size: 15px;
  opacity: 1.75;
  line-height: 35px;
  text-align: left;
  padding-left: 110px;
  margin: 0;
}

.carousel-item-intro {
  background-color: #19aaaf73;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0 0 25px #a3b3b965;
}

.carousel-item-func {
  background-color: #19aaaf73;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0 0 25px #a3b3b965;
}

.carousel-item-env {
  background-color: #19aaaf73;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0 0 25px #a3b3b965;
}

.carousel-item-intro {
  background-color: #b95e5e;
}

.carousel-item-func {
  background-color: #52c578;
}

.carousel-item-env {
  background-color: #41a7b9;
}
</style>
