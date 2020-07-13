<template>
  <div>
    <h1 class="title">My Favorite Recipes</h1>
    <b-col cols ="3">
        <b-row v-for="item in this.myFavoriteRecipes" :key="item.recipeID">
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
        myFavoriteRecipes:[],
    }
},
components:{
    RecipePreview
},
mounted(){
    this.getmyFavoriteRecipes();
},
methods:{
    async getmyFavoriteRecipes(){
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes'
        let response =  this.axios.get(link).then((res)=>{
            console.log(this);
            console.log(res.data);
            let temp=[];
            temp.push(...res.data);
            temp.map((x)=> {x.isFavorite=true});
            this.myFavoriteRecipes=temp;
        }).catch((err)=>{
            console.error(err);
        })
    }
}
}
</script>

 <style>

 </style>