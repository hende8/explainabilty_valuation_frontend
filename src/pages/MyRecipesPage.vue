<template>
  <div class="container" >
    <h1 class="title">My Recipes</h1>
    <b-col cols ="3">
        <b-row v-for="item in myRecipes" :key="item.recipeID">
          <RecipePreview class="recipePreview" :recipe="item" />
        </b-row>
    </b-col>
          

 </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";

export default {
data(){
    return{
        myRecipes:null,
    }
},
components:
{
RecipePreview
},
mounted(){
// getMyRecipes();
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myRecipes';
        let response =  this.axios.get(link).then((res)=>{
            console.log(res.data);
            this.myRecipes=res.data.message;
        }).catch((err)=>{
            console.error(err);
        })
},


methods:{
    getMyRecipes(){
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myRecipes';
        let response =  this.axios.get(link).then((res)=>{
            console.log(res.data);
            myRecipes=res.data.message;
        }).catch((err)=>{
            console.error(err);
        })
    }
}
}
</script>

 <style>

 </style>