<template>
  <div>
    <h1 class="title">My Favorite Recipes</h1>
    <b-col cols ="3">
        <b-row v-for="item in myFavoriteRecipes" :key="item.recipeID">
          <RecipePreview class="recipePreview" :recipe="item" />
        </b-row>
    </b-col>
          

 </div>
</template>

<script>
export default {
data(){
    return{
        myFavoriteRecipes:null,
    }
},
mounted(){
    this.getMyFavoriteRecipes();
},
methods:{
    getMyFavoriteRecipes(){
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes'
    }
}
}
</script>

 <style>

 </style>