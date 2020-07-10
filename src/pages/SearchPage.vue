<template>
  <div class="container">
    <h1 class="title">Search</h1>
    <b-navbar type="light" variant="light">
      <b-nav-form>
        <b-form-input
          id="search"
          v-model="search"
          class="mr-sm-2"
          placeholder="Search"
          label-for="search"
        ></b-form-input>
        <b-dropdown class="mr-sm-2" text="No. results"  variant="info">
          <b-dropdown-item @click="numResult('5')">5</b-dropdown-item>
          <b-dropdown-item @click="numResult('10')">10</b-dropdown-item>
          <b-dropdown-item @click="numResult('15')">15</b-dropdown-item>
        </b-dropdown>

        <b-form-group class="mr-sm-2" label="Cusines:" label-for="Cusines">
          <b-form-select id="cusineChoose" v-model="cusineChoose" :options="cusines" v-on:change="cusinesSelected"></b-form-select>
        </b-form-group>
        <b-form-group class="mr-sm-2" label="Intolerances: " label-for="Intolerances">
          <b-form-select v-model="intolerancesChoose" id="intolerances" :options="intolerances" v-on:change="intolerancesSelected"></b-form-select>
        </b-form-group>
        <b-form-group label="Diet:" label-for="Diet">
          <b-form-select v-model="dietChoose" id="diets" :options="diets" v-on:change="dietSelected"></b-form-select>
        </b-form-group>
      </b-nav-form>
      <b-button
        variant="outline-success"
        class="my-2 my-sm-4"
        type="submit"
        @click="searchRecipes"
      >Search</b-button>
    </b-navbar>
  <div >
          <b-col cols ="3" v-if="hasLastSearch && !this.hasResult">
        <b-row v-for="item in lastSearchResults" :key="item.recipeID">
          <RecipePreview class="recipePreview" :recipe="item" />
        </b-row>
          </b-col>
  </div>

    <div>
      <b-row v-if="this.hasResult">
      <b-form-group label="Sort by:">
      <b-form-radio  @change.native="sortByPopularity($event)" value="Popularity" name="some-radios">Popularity</b-form-radio>
      <b-form-radio  @change.native="sortByCookingDuration($event)" value="duration" name="some-radios">Cooking duration</b-form-radio>
      </b-form-group>
      <b-col cols ="3">
        <b-row v-for="item in results" :key="item.recipeID">
          <RecipePreview class="recipePreview" :recipe="item" />
        </b-row>
        </b-col>
      </b-row>
      <h1 v-if="this.notFoundRecipes">Search not found , try again!</h1>
    </div>
  </div>
</template>


<script>
import app_data from "../assets/app_data";
import RecipePreview from "../components/RecipePreview";
export default {
  data() {
    return {
      search: "",
      numberOfResults: 5,
      hasResult: false,
      hasLastSearch: false,
      lastSearchResults:null,
      results: [],
      cusines: app_data.cusines,
      diets: app_data.diet,
      intolerances: app_data.intolerances,
      cusineChoose: "",
      dietChoose: "",
      intolerancesChoose: ""

    };
  },
  components: {
    RecipePreview
  },
  mounted() {
    if(sessionStorage.getItem("lastSearch"))
      this.hasLastSearch=true;
      this.lastSearchResults = JSON.parse(sessionStorage.getItem("lastSearch"));
  },
  computed:{

  },
  methods: {
    async searchRecipes(req, response) {
      console.log(this.cusineChoose);
      try {
        let link = 'https://assignment3-2-shiran-hen.herokuapp.com/recipes/search/query/'
        // var link ="http://localhost:3000/recipes/search/query/";

        link += this.search + "/number/" + this.numberOfResults.toString();
      console.log(this.cusineChoose);
      console.log(this.intolerancesChoose);
      console.log(this.dietChoose);

      // console.log(link);
        response = await this.axios.get(link, {
            query: {
              cuisine : this.cusineChoose,
              intolerances : this.intolerancesChoose,
              diet : this.dietChoose

            }});
      } catch (err) {
        console.log(err);
      }
      console.log(response);
      if (response.status == "200") {
        this.hasResult = false;
        this.hasResult = true;
        // let ans = [
        //     {
        //         "recipeID": 635350,
        //         "imageURL": "https://spoonacular.com/recipeImages/635350-556x370.jpg",
        //         "name": "Blue Cheese Burgers",
        //         "cookingDuration": 1001,
        //         "likes": 7,
        //         "isVegeterian": false,
        //         "isVegan": false,
        //         "isGluten": false
        //     },
        //     {
        //         "recipeID": 642539,
        //         "imageURL": "https://spoonacular.com/recipeImages/642539-556x370.png",
        //         "name": "Falafel Burger",
        //         "cookingDuration": 45,
        //         "likes": 4,
        //         "isVegeterian": true,
        //         "isVegan": false,
        //         "isGluten": false
        //     },
        //     {
        //         "recipeID": 6501781,
        //         "imageURL": "https://spoonacular.com/recipeImages/650181-556x370.jpg",
        //         "name": "Little Italy Burger",
        //         "cookingDuration": 45,
        //         "likes": 1,
        //         "isVegeterian": false,
        //         "isVegan": false,
        //         "isGluten": false
        //     },
        //     {
        //         "recipeID": 6633757,
        //         "imageURL": "https://spoonacular.com/recipeImages/663357-556x370.jpg",
        //         "name": "The Unagi Burger",
        //         "cookingDuration": 45,
        //         "likes": 1,
        //         "isVegeterian": false,
        //         "isVegan": false,
        //         "isGluten": false
        //     }
        // ]
        // this.setResults(response.data);
        let ans = response.data;
        this.setResults(ans)
      // }
    }
    }
    
    
    ,
    numResult(result) {
      this.numberOfResults = result;
    },
    showSearchResult(recipes) {
      if (this.results.length > 0) {
        this.hasResult = true;
      }
      this.hasResult = recipes;
    },
    setResults(data) {
      if(data.length>0){
      this.results = data;
      this.hasResult=true;
      sessionStorage.setItem("lastSearch", JSON.stringify(data));
      this.hasLastSearch=true;
      }else{
          this.hasResult=false;
          this.hasLastSearch=false;
          this.notFoundRecipes=true;
      }

    },
      sortByPopularity: function(){
      this.hasResult=false;
      console.log(this.hasResult);
      this.results.sort(function(a,b){return b.likes - a.likes})
      console.log("pushed sortByPopularity");
      console.log(this.results);
      this.hasResult=true;

    },
    sortByCookingDuration: function (){
    console.log("pushed cooking duration");
    this.hasResult=false;
    this.results.sort(function(a,b){return a.cookingDuration - b.cookingDuration})
    this.hasResult=true;

    },
    cusinesSelected(value){
      console.log(value);
      this.cusineChoose=value;

    },
    dietSelected(value){
      this.dietChoose=value;

    },
    intolerancesSelected(value){
      this.intolerancesChoose=value;

    }



  }
};
</script>
 