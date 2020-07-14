<template>
  <div class="container-fluid">
    <div class="row">
      <div  class="col-lg-6">
        <RecipePreviewList action="random" title="Explore these recipes" class="Recipes"></RecipePreviewList>
      </div>
      <div  class="col-lg-6">
        <LoginPage v-if="!$root.store.username" class="login"></LoginPage>
        <RecipePreviewList v-else action="lastView" title="Last Viewed Recipes" class="Recipes"></RecipePreviewList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";

export default {
  components: {
    RecipePreviewList,
    LoginPage
  },
  data(){
    return{
      rerender:0
    }
  },
  methods:{
    setLogin(){
      this.rerender+=1;
      console.log(this.login+ "cheeeeeeeeeeeeeeck")
      
    }
  }
};
</script>

<style lang="scss" scoped>
.Recipes {
  margin: 10px 0 10px;
  max-width: 100%;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

// .login {
//   margin: 10px 0 10px;
//   height: 50%;
//   width: 50%;
//   // z-index: 1;
//   top: 0;
//   overflow-x: hidden;
//   padding-top: 20px;
//   right: 0;
// }
</style>
