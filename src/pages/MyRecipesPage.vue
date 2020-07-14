<template>
  <div class="container" >
    <h1 class="title">My Recipes</h1>
    <b-col cols ="3">
        <b-row v-for="item in myRecipes" :key="item.recipeID">
          <RecipePreviewInternal class="recipePreview" :recipe="item" />
        </b-row>
    </b-col>
          

 </div>
</template>

<script>
import RecipePreviewInternal from "../components/RecipePreviewInternal";

export default {
data(){
    return{
        myRecipes:null,
    }
},
components:
{
RecipePreviewInternal
},
mounted(){
// getMyRecipes();
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myRecipes';
        let response =  this.axios.get(link).then((res)=>{
            this.myRecipes=res.data.message;
            var dict=this.myRecipes;
            // this.myRecipes.map((val)=>{
            //     dict.push({
            //         key:val.recipeID,
            //         value: val,
            //     })

            // })
            this.$store.recipes=dict;
            console.log(this.$store);

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