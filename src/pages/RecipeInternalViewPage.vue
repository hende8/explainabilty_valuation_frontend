<template>
  <RecipeInternalView v-if ="this.recipeee" :recipe="this.recipeee[0]"></RecipeInternalView>
</template>

<script>
import RecipeInternalView from "../components/RecipeInternalView";
export default {
  data(){
    return{
    recipeee:undefined
  }
  },
  components:{
    RecipeInternalView
  },

  mounted(){
    console.log(this.$route.params.recipeId);
    console.log(this.$store.recipes);
    this.recipeee=this.$store.recipes.filter(recipe=> recipe.recipeID==this.$route.params.recipeId)
  }


}
</script>

<style>

</style>