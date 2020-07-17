<template>
  <div>
    <h1 style="text-align:center; color:whitesmoke;">My Family Recipes</h1><br>
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
        // let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myFamilyRecipes'
        let link = 'http://localhost:3000/user/myFamilyRecipes'
        let response =  this.axios.get(link).then((res)=>{
            this.myFamilyRecipes=res.data.message;
        }).catch((err)=>{
            this.$router.push("/login");

        })
    }
}
}
</script>

 <style>
 </style>