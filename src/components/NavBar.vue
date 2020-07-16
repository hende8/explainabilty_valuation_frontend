<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" style=" z-index:10000; position: fixed; top:0; mergin:0; left:0; width:100%" >
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <h3 style="color: white;margin-right:13px" >
            Happy Recipes
          </h3>
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

          <b-nav-item-dropdown text="Guest" right v-if="!username">
            <router-link tag="b-dropdown-item" to="/register" href="#"
              >Sign up</router-link
            >
            <router-link tag="b-dropdown-item" to="/login">Sign in</router-link>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="username" text="Personal" right>
            <router-link tag="b-dropdown-item" to="/myFavoriteRecipes" href="#"
              >My Favorite Recipes</router-link
            >
            <router-link tag="b-dropdown-item" to="/myRecipes" href="#"
              >My Recipes</router-link
            >
            <router-link tag="b-dropdown-item" to="/myFamilyRecipes" href="#"
              >My Family Recipes</router-link
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="username" :text="this.username" right>
            <router-link tag="b-dropdown-item" to="/search" href="#"
              >New Recipe</router-link
            >
            <router-link
              tag="b-dropdown-item"
              :to="{ name: 'main' }"
              @click.native="logout"
              >Loguot</router-link
            >
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

.b-navbar {
    position: fixed;
    margin: 0px;
    padding: 0px;
    top: 0px;
    right: 200px;
    list-style: none;
    z-index:999999;
}
ul#navigation li {
    display:inline;
    float:left;
    width:100px;
    margin-left:1px;

}
ul#navigation li a {
    display: block;
    font-weight:bold;
    text-shadow:1px 1px 1px #fff;
    float:left;
    width: 100px;
    height: 35px;
    color:#603d05;
    background:transparent url("../assets/item.png") no-repeat bottom right;
    text-decoration:none;
    text-align:center;
    padding-top:80px;
    margin-top: -40px;
    cursor:pointer;

}
ul#navigation li a:hover{

}
</style>
