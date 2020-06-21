<template>
  <div class="container">
    <h1 class="title">Search</h1>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input id="search" v-model="search"
        class="mr-sm-2" placeholder="Search" label-for="search"></b-form-input>
      <b-dropdown text="No. results" variant="info">
        <b-dropdown-item @click="numResult('5')">5</b-dropdown-item>
        <b-dropdown-item @click="numResult('10')" >10</b-dropdown-item>
        <b-dropdown-item @click="numResult('15')">15</b-dropdown-item>
      </b-dropdown>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit" @click="searchRecipes">Search</b-button>
    </b-nav-form>
  </b-navbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      search: "",
      numberOfResults:5
    };
  },
    methods:{
         searchRecipes(){
             console.log(this.search, this.numberOfResult)
         },
          numResult(result){
            this.numberOfResult=result
         }
    }





  }
</script>
 