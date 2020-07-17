<template>
  <div>
    <b-navbar toggleable="lg" style="background-color: midnightblue; z-index:10000; position: fixed; top:0; mergin:0; left:0; width:100%" >
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link tag="h3" :to="{ name: 'main' }" style="color: white;margin-right:13px" >
            Happy Recipes
          </router-link>
          <router-link tag="b-nav-item" :to="{ name: 'main' }"
            >Home</router-link
          >
          <router-link tag="b-nav-item" :to="{ name: 'search' }"
            >Search</router-link
          >
          <router-link tag="b-nav-item" :to="{ name: 'about' }"
            >About</router-link
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form> </b-nav-form>
        <b-nav-item-dropdown text="Hello guest" right v-if = "!username">
        <router-link tag="b-dropdown-item" to="/register" href="#">Sign up</router-link>
        <router-link tag="b-dropdown-item" to="/login" >Sign in</router-link>
        </b-nav-item-dropdown>
              <b-nav-item-dropdown v-if="username" text="Personal" right>
        <router-link tag="b-dropdown-item" to="/myFavoriteRecipes" href="#">My Favorite Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/myRecipes" href="#">My Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/myFamilyRecipes" href="#">My Family Recipes</router-link>
      </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="username" :text="this.username" right>
        <!-- <router-link tag="b-dropdown-item"   style ="color: transparent;
        text-shadow: 0 0 10px;" href="#" disabled >New Recipe</router-link> -->
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
  // computed:{
  //        logout(){
  //            console.log("log out button pushed")
  //            this.username=null;
  //        }
  // },
  methods: {
    logout() {
      console.log("log out button pushed");
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
.hi{
  background-color: midnightblue;
}
</style>
