<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
        <router-link tag="b-nav-item" :to="{ name: 'main' }" >Home</router-link>
        <router-link tag="b-nav-item" :to="{ name: 'search' }" >Search</router-link>
      <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="User" right>
        <router-link tag="b-dropdown-item" to="/login" href="#">My Recipes</router-link>
        <router-link tag="b-dropdown-item" to="/login" href="#">My Favorite Recipes</router-link>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="Account" right>
        <router-link tag="b-dropdown-item" to="/login" href="#">My profile</router-link>
        <router-link tag="b-dropdown-item" to="/login" >Loguot</router-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>

</template>

<script>
export default {
    methods:{
         logout(){
             console.log("log out button pushed")
         }
    }





  }
</script>
