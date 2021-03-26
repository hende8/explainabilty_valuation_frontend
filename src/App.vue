<template>
  <div id="app">
    <div id="nav">
      <NavBar> </NavBar>
    </div>
    <div>
      <SideBar> </SideBar>
    </div>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar"

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
    SideBar,
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
  // background-image: url("./assets/pic5.jpg");
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
