<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link tag="b-nav-item" :to="{ name: 'main' }" >Home</router-link>
        <router-link tag="b-nav-item" :to="{ name: 'search' }" >Search</router-link>
        <router-link tag="b-nav-item" :to="{ name: 'about' }" >About</router-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
        </b-nav-form>

        <b-nav-item-dropdown text="Guest" right v-if = "!username">
        <router-link tag="b-dropdown-item" to="/register" href="#">Sign up</router-link>
        <router-link tag="b-dropdown-item" to="/login" >Sign in</router-link>
        </b-nav-item-dropdown>
              <b-nav-item-dropdown v-if="username" text="Personal" right>
        <router-link tag="b-dropdown-item" to="/myFavoriteRecipes" href="#">My Favorite Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/myRecipes" href="#">My Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/myFamilyRecipes" href="#">My Family Recipes</router-link>
      </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="username" :text="this.username" right>
        <router-link tag="b-dropdown-item" to="/search" href="#">New Recipe</router-link>
        <router-link tag="b-dropdown-item" :to="{ name: 'main' }" @click.native="logout" >Loguot</router-link>
      </b-nav-item-dropdown>


      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  data(){
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
