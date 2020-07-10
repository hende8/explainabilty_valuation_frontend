<template>
  <div class="container-fluid">
    <div class="row">
      <div  class="col-lg-6">
        <RecipePreviewList title="Randome Recipes" class="RandomRecipes center"></RecipePreviewList>
      </div>
      <div  class="col-lg-6">
        <LoginPage v-if="!$root.store.username" class="login"></LoginPage>
        <LastVeiwList v-else
        title="Last Viewed Recipes"
        :class="{
          RandomRecipes: true,
          blur: !$root.store.username,
          center: true
        }"
        disabled>
        </LastVeiwList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LastVeiwList from "../components/LastViewList.vue";
import LoginPage from "./LoginPage.vue";

export default {
  components: {
    RecipePreviewList,
    LastVeiwList,
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
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
