<template>
  <div class="container">
    <h1 class="title">Search</h1>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input id="search" v-model="search"
        class="mr-sm-2" placeholder="Search" label-for="search"></b-form-input>
      <b-dropdown text="No. results" variant="info">
        <b-dropdown-item @click="numResult('5')">5</b-dropdown-item>
        <b-dropdown-item @click="numResult('10')" >10</b-dropdown-item>
        <b-dropdown-item @click="numResult('15')">15</b-dropdown-item>
      </b-dropdown>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit" @click="searchRecipes">Search</b-button>
    </b-nav-form>
  </b-navbar>
  <il v-if= "this.hasResult">
    <h1>show </h1>
        <RecipePreviewList  v-for="recipe in this.results" :key=recipe.recipeID></RecipePreviewList>
    </il>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  data() {
    return {
      search: "",
      numberOfResults:5,
      hasResult : false,
      results:[]

    };
  },
  components:{
  RecipePreviewList
  },
    methods:{
        async searchRecipes(req, response){
          // try {
        //     let link = 'https://assignment3-2-shiran-hen.herokuapp.com/recipes/search/query/'
        //     link+=this.search+"/number/"+this.numberOfResults.toString()
        //     // link="https://assignment3-2-shiran-hen.herokuapp.com/recipes/search/query/burger/number/5"
        //                 console.log(link)

        //    response = await this.axios.get(
        //     link
        //   );
        // } catch (err) {
        //   console.log(err);
        // }
        // if(response.status =='200'){
          this.hasResult=true;
          let ans = [
    {
        "recipeID": 635350,
        "imageURL": "https://spoonacular.com/recipeImages/635350-556x370.jpg",
        "name": "Blue Cheese Burgers",
        "cookingDuration": 45,
        "likes": 7,
        "isVegeterian": false,
        "isVegan": false,
        "isGluten": false
    },
    {
        "recipeID": 642539,
        "imageURL": "https://spoonacular.com/recipeImages/642539-556x370.png",
        "name": "Falafel Burger",
        "cookingDuration": 45,
        "likes": 4,
        "isVegeterian": true,
        "isVegan": false,
        "isGluten": false
    },
    {
        "recipeID": 650181,
        "imageURL": "https://spoonacular.com/recipeImages/650181-556x370.jpg",
        "name": "Little Italy Burger",
        "cookingDuration": 45,
        "likes": 1,
        "isVegeterian": false,
        "isVegan": false,
        "isGluten": false
    },
    {
        "recipeID": 663357,
        "imageURL": "https://spoonacular.com/recipeImages/663357-556x370.jpg",
        "name": "The Unagi Burger",
        "cookingDuration": 45,
        "likes": 1,
        "isVegeterian": false,
        "isVegan": false,
        "isGluten": false
    },
    {
        "recipeID": 636595,
        "imageURL": "https://spoonacular.com/recipeImages/636595-556x370.jpg",
        "name": "Butternut Squash Quinoa Burgers",
        "cookingDuration": 45,
        "likes": 1,
        "isVegeterian": true,
        "isVegan": false,
        "isGluten": false
    }
]
          // this.setResults(response.data)
          console.log(ans)
          this.setResults(ans)
        // }

         },
          numResult(result){
            this.numberOfResult=result;
         },
         showSearchResult(recipes){
           if(recipes.length>0){
             this.hasResult=true;
           }
           this.hasResult=recipes;
         },
         setResults(data){
           let i =0;
           for(i=0;i<data.length;i++){
             this.results[i]=data[i]
           }
         }
    }





  }
</script>
 