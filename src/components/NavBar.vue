<template>
  <div>
    <b-navbar class="nav" toggleable="lg" style="z-index:10000; position: fixed; top:0; mergin:0; left:0; width:100%" >
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link tag="h4" :to="{ name: 'main' }" class="logo" style=" margin-right:13px" >
            Happy Recipes
          </router-link>
          <router-link tag="b-nav-item" style="margin-right:13px" :to="{ name: 'main' }"
            >
            <span class="n">Home</span></router-link
          >
          <router-link tag="b-nav-item" style="margin-right:13px" :to="{ name: 'search' }"
            > <span class="n">Search</span></router-link
          >
          <router-link tag="b-nav-item" style="color: white; margin-right:13px" :to="{ name: 'about' }"
            > <span class="n" >About</span></router-link
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if = "!this.$root.store.username" text="Hello guest" toggle-class="text-white" right >
        <router-link tag="b-dropdown-item" to="/register" href="#">Sign up</router-link>
        <router-link tag="b-dropdown-item" to="/login" >Sign in</router-link>
        </b-nav-item-dropdown>
              <b-nav-item-dropdown v-if="this.$root.store.username" text="Personal" toggle-class="text-white"  right>
        <router-link tag="b-dropdown-item" to="/myFavoriteRecipes" href="#">My Favorite Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/myRecipes" href="#">My Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/myFamilyRecipes" href="#">My Family Recipes</router-link>
      </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="this.$root.store.username" :text="this.$root.store.username" toggle-class="text-white"  right>

        <router-link tag="b-dropdown-item" :to="{ name: 'main' }" @click.native="logout" >Loguot</router-link>
      </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
export default {
  data() {
    return {
      username: this.$root.store.username,
    };
  },
  methods: {
    logout() {
      this.username = null;
      this.$root.store.logout(this.username);
    },
  },
  mounted() {
    this.$root.$on("loginUserNavBar", (data) => {
      this.username = data;
    });
  },
};
</script>
<style scoped>
.nav{
  background-color: rgba(13, 5, 48, 0.452);
}
.n{
   color: whiteSmoke ;
}
.logo{
border: 2px solid rgba(231, 231, 231, 0.993);
border-radius: 10px 10px 10px 10px;
color: #fffffffd;
background: #333333;
text-shadow: #FFF 0px 0px 15px, #5a2dff 0px 0px 20px, #5a2dff 0px 0px 30px, #5a2dff 0px 0px 40px;


}


</style>
