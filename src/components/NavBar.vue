<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/main">
        <p class="h3 mb-2">
          <b-icon icon="house-door-fill" style="color: #7952b3"></b-icon>
        </p>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
          <b-nav-item href="/main"  style="color: #7952b3"  >
            Evaluation System</b-nav-item
          >

        </b-navbar-nav>
        <b-navbar-nav  v-if="this.$root.store.nav">
          <b-nav-item-dropdown right >
            <template v-slot:button-content>
              <b-icon icon="question-square" style="color: #7952b3; "></b-icon>
              <em>Explaination Model </em>
            </template>
            <b-dropdown-item router-link :to="{ name: 'shap' }"
              ><b-icon icon="star-fill" style="color: #7952b3"></b-icon>
              SHAP</b-dropdown-item
            >
            <b-dropdown-item router-link :to="{ name: 'lime' }">
              <b-icon icon="receipt" style="color: #7952b3"></b-icon>
              Lime
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item router-link :to="{ name: 'evaluation' }"  >
            <b-icon icon="display" style="color: #7952b3"></b-icon>

            Evaluation Tools
          </b-nav-item>
                  <b-navbar-nav >
          <b-nav-item router-link :to="{ name: 'about' }"  style="color: #7952b3"  >
            <b-icon icon="info-square-fill" style="color: #7952b3"></b-icon>
            About</b-nav-item
          >

        </b-navbar-nav>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import app_data from '../assets/app_data'

export default {
  methods: {
  },
  mounted() {
  },
};
</script>
<style scoped>
.nav {
  background-color: rgba(13, 5, 48, 0.452);
}
.n {
  color: whiteSmoke;
}
.logo {
  border: 2px solid rgba(231, 231, 231, 0.993);
  border-radius: 5px 10px 10px 10px;
  color: #fffffffd;
  background: #333333;
  text-shadow: #fff 0px 0px 15px, #5a2dff 0px 0px 20px, #5a2dff 0px 0px 30px,
    #5a2dff 0px 0px 40px;
}
</style>
