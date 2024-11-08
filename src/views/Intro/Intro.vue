<template>
  <div class="page-container" style="width:99%;margin-top:15px;">
    <el-carousel :interval="3000" type="card" height="450px" class="carousel">
      <el-carousel-item class="carousel-item-intro">
        <h2>Project Introduction</h2>
        <ul>
          <li>A Java EE rapid development platform based on Spring Boot, Spring Cloud, Vue, and Element</li>
          <li>Aims to provide a simple and easy-to-use solution to help users effectively reduce project development
            difficulty and cost</li>
          <li>The blog provides a series of tutorial articles on the project development process, guiding you through
            how to develop similar systems</li>
        </ul>
        <div><img src="@/assets/logo.svg" style="width:120px;height:120px;padding-top:15px;" /></div>
      </el-carousel-item>
      <el-carousel-item class="carousel-item-func">
        <h2>Function Plan</h2>
        <ul>
          <li>✔ System Login: User login system authentication (token method)</li>
          <li>✔ User Management: Create, modify, delete, query users</li>
          <li>✔ Organization Management: Create, modify, delete, query organizations</li>
          <li>✔ Role Management: Create, modify, delete, query roles</li>
          <li>✔ Menu Management: Create, modify, delete, query menus</li>
          <li>✔ System Log: Record user operation logs, view system execution log records</li>
          <li>✔ Data Monitoring: Customize Druid information, provide concise and effective SQL monitoring</li>
          <li>✔ Aggregated Documentation: Customize online documentation, provide concise and beautiful API
            documentation</li>
          <li>✔ Backup Recovery: System backup recovery, one-click restore initial data</li>
          <li>✔ Theme Switching: Support theme switching, customize color schemes, one-click skin change</li>
          <li>✔ Service Governance: Integrate Spring Cloud, implement comprehensive service governance</li>
          <li>✔ Service Monitoring: Integrate Spring Boot Admin, implement microservice monitoring</li>
          <li>...</li>
        </ul>
      </el-carousel-item>
      <el-carousel-item class="carousel-item-env">
        <h2>Development Environment</h2>
        <ul>
          <li>IDE : eclipse 4.6.x. JDK : JDK 1.8.x.</li>
          <li>Maven : Maven 3.5.x. MySQL: MySQL 5.7.x.</li>
          <li>IDE : VS Code 1.27. Webpack：webpack 3.2.x.</li>
          <li>NODE: Node 8.9.x. NPM : NPM 6.4.x.</li>
        </ul>
        <h2>Technology Selection</h2>
        <ul>
          <li>Main Framework: Spring Boot 2.x. Service Governance: Spring Cloud.</li>
          <li>View Framework: Spring MVC 5.x. Persistence Layer Framework: MyBatis 3.x.</li>
          <li>Database Connection Pool: Druid 1.x. Security Framework: Shiro 1.4.x.</li>
          <li>Front-end Framework: Vue.js 2.x. Page Components: Element 2.x.</li>
          <li>State Management: Vuex.js 2.x. Backend Interaction: axios 0.18.x.</li>
          <li>...</li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  components: {
  },
  methods: {
  }
}
</script>

<style>
.carousel {
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 20px;
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
