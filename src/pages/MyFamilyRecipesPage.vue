<template>
  <div>
    <h1 class="title">My Family Recipes</h1>
    <b-col cols ="5">
        <b-row v-for="(item) in this.myFamilyRecipes" :key="item.recipeID">
          <RecipeFamilyPreview class="recipePreview" :recipe="item" />
          <br>          <br>

        </b-row>
    </b-col>
 </div>
</template>

<script>
import RecipeFamilyPreview from "../components/RecipeFamilyPreview";


export default {
data(){
    return{
        myFamilyRecipes:[],
    }
},
components:{
    RecipeFamilyPreview
},
mounted(){
    this.getMyFamilyRecipes();
},
methods:{
    async getMyFamilyRecipes(){
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myFamilyRecipes'
        let response =  this.axios.get(link).then((res)=>{
            this.myFamilyRecipes=res.data.message;
        }).catch((err)=>{
            console.error(err);
        })
    }
}
}
</script>

 <style>

 </style>