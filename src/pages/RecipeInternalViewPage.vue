<template>
  <RecipeInternalView v-if ="this.recipes.length>0" :recipe="this.recipes[0]"></RecipeInternalView>
</template>

<script>
import RecipeInternalView from "../components/RecipeInternalView";
export default {
  data(){
    return {
    recipes:[]
  }
  },
  components:{
    RecipeInternalView
  },

  mounted(){
    console.log(this.$store.recipes);
    this.recipes=this.$store.recipes.filter(recipe=> recipe.recipeID==this.$route.params.recipeId)
    console.log(this.recipes[0]);
  }


}
</script>

<style>

</style>