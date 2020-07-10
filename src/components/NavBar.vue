<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
        <router-link tag="b-nav-item" :to="{ name: 'main' }" >Home</router-link>
        <router-link tag="b-nav-item" :to="{ name: 'search' }" >Search</router-link>
        <router-link tag="b-nav-item" :to="{ name: 'search' }" >About</router-link>
      <!-- Navbar dropdowns -->
        <!-- <b-nav-item-dropdown text="User" right>
        <router-link tag="b-dropdown-item" to="/login" href="#">My Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/login" href="#">My Favorite Recipes</router-link>
      </b-nav-item-dropdown> -->
  <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown  v-if = "!username" text="Guest" right >
        <router-link tag="b-dropdown-item" to="/register" href="#">Sign up</router-link>
        <router-link tag="b-dropdown-item" to="/login" >Sign in</router-link>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown v-else :text="username" right>
        <router-link tag="b-dropdown-item" to="/myRecipes" href="#">My Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/login" href="#">My profile</router-link>
        <router-link tag="b-dropdown-item" to="/login" href="#">My Favorite Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/login" href="#">My Family Recipes</router-link>


        <router-link tag="b-dropdown-item" :to="{ name: 'main' }" @click.native="logout" >Loguot</router-link>
      </b-nav-item-dropdown>
  </b-navbar-nav>
    </b-navbar-nav>

    </b-navbar>


</template>

<script>
export default {
  data(){
    return {
      username: null,
    };
  },
  // computed:{
  //        logout(){
  //            console.log("log out button pushed")
  //            this.username=null;
  //        }
  // },
    methods:{
         logout(){
             console.log("log out button pushed")
             this.username=null;
            this.$root.store.logout(this.username);

         }
    },
    mounted() {
    this.$root.$on('loginUserNavBar', data => {
        this.username=data;
    });
}





  }
</script>
