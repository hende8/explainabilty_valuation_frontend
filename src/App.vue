<template>
  <div id="app">
    <div id="nav">
      <NavBar> </NavBar>
    </div>

    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  methods: {
    Logout() {
      $store.username = undefined;
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
  components: {
    NavBar,
  }

};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-size: 100% 100%;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: grey;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
