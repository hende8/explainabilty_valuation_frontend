<template>
  <div class="container">
    <h1 class="title">Search</h1>
    <b-navbar type="light" variant="light">
      <b-nav-form>
        <b-row class="my-1">
          <b-col md="9">
            <b-form-input
              id="search"
              v-model="$v.form.search.$model"
              placeholder="Search"
              label-for="search"
              type="text"
              style="margin-right:5px"
              :state="validateState('search')"
              size="lg"
            ></b-form-input>
            <b-form-invalid-feedback v-if="$v.form.search.length"></b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-dropdown id ="numResult" class="mr-sm-2" style="width:120px" :text="buttonTitle">
          <b-dropdown-item @click="numResult('5')">5</b-dropdown-item>
          <b-dropdown-item @click="numResult('10')">10</b-dropdown-item>
          <b-dropdown-item @click="numResult('15')">15</b-dropdown-item>
        </b-dropdown>
        
        <b-row>
        <b-form-group class="mr-sm-2" label="Cusines:" label-for="Cusines">
          <b-form-select
            id="cusineChoose"
            v-model="cusineChoose"
            :options="cusines"
            v-on:change="cusinesSelected"

          ></b-form-select>
        </b-form-group>
        <b-form-group
          class="mr-sm-2"
          label="Intolerances: "
          label-for="Intolerances"
        >
          <b-form-select
            v-model="intolerancesChoose"
            id="intolerances"
            :options="intolerances"
            v-on:change="intolerancesSelected"
          ></b-form-select>
        </b-form-group>
        <b-form-group label="Diet:" label-for="Diet">
          <b-form-select
            v-model="dietChoose"
            id="diets"
            :options="diets"
            v-on:change="dietSelected"
          ></b-form-select>
        </b-form-group>
        </b-row>
      </b-nav-form>
              
      <b-button
        variant="outline-success"
        class="my-2 my-sm-4"
        type="submit"
        @click="onSearch"
      >Search</b-button>
    </b-navbar>
    <div>
      <b-row cols="3" v-if="hasLastSearch && !this.hasResult">
        <b-col v-for="item in lastSearchResults" :key="item.recipeID">
          <RecipePreview class="recipePreview" :recipe="item" />
        </b-col>
      </b-row>
    </div>

    <div>
      <b-row v-if="this.hasResult">
        <b-form-group label="Sort by:">
          <b-form-radio
            @change.native="sortByPopularity($event)"
            value="Popularity"
            name="some-radios"
            >Popularity</b-form-radio
          >
          <b-form-radio
            @change.native="sortByCookingDuration($event)"
            value="duration"
            name="some-radios"
            >Cooking duration</b-form-radio
          >
        </b-form-group>
        <b-row cols="3">
          <b-col v-for="item in results" :key="item.recipeID">
            <RecipePreview class="recipePreview" :recipe="item" />
          </b-col>
        </b-row>
      </b-row>
      <h1 v-if="this.notFoundRecipes">Search not found , try again!</h1>
    </div>
  </div>
</template>

<script>
import app_data from "../assets/app_data";
import RecipePreview from "../components/RecipePreview";
import { required, minLength, alpha } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        search: "",
      },
      search: "",
      numberOfResults: 5,
      hasResult: false,
      hasLastSearch: false,
      lastSearchResults: null,
      results: [],
      cusines: app_data.cusines,
      diets: app_data.diet,
      intolerances: app_data.intolerances,
      cusineChoose: "",
      dietChoose: "",
      intolerancesChoose: "",
      notFoundRecipes: false,
      buttonTitle:"No. results"
    };
  },
  validations: {
    form: {
      search: {
        required,
        length: u => minLength(1)(u),
        alpha
      },
    }
  },
  components: {
    RecipePreview,
  },
  async mounted() {
    // if (sessionStorage.getItem("lastSearch")) this.hasLastSearch = true;
    // this.lastSearchResults = JSON.parse(sessionStorage.getItem("lastSearch"));

    if (this.$store.lastSearch && this.$root.store.username) {
      this.hasLastSearch = true;
      this.lastSearchResults = await this.getUserInformation(
        this.$store.lastSearch
      );
    }
  },
  computed: {},
  methods: {
    async searchRecipes(req, response) {
      console.log(this.cusineChoose);
      try {
        let link =
          "https://assignment3-2-shiran-hen.herokuapp.com/recipes/search/query/";
        // var link = "http://localhost:3000/recipes/search/query/";

        link += this.search + "/number/" + this.numberOfResults.toString();
        console.log(this.cusineChoose);
        console.log(this.intolerancesChoose);
        console.log(this.dietChoose);
        console.log(this.search);

        // console.log(link);
        response = await this.axios.get(link, {
          params: {
            cuisine: this.cusineChoose,
            intolerances: this.intolerancesChoose,
            diet: this.dietChoose,
          },
        });
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
        if (this.$root.store.username) {
          ans = await this.getUserInformation(ans);
        }
        this.setResults(ans);
        // }
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onSearch() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.search=this.form.search;
      this.searchRecipes();
    },

    numResult(result) {
      this.numberOfResults = result;
      this.buttonTitle = result;
    },
    showSearchResult(recipes) {
      if (this.results.length > 0) {
        this.hasResult = true;
      }
      this.hasResult = recipes;
    },
    setResults(data) {
      if (data.length > 0) {
        this.results = data;
        if(this.$root.store.username){
        this.hasResult = true;
        this.$store.lastSearch = data;
        // sessionStorage.setItem("lastSearch", JSON.stringify(data));
        this.hasLastSearch = true;
        }

      } else {
        this.hasResult = false;
        this.hasLastSearch = false;
        this.notFoundRecipes = true;
      }
    },
    sortByPopularity: function() {
      this.hasResult = false;
      console.log(this.hasResult);
      this.results.sort(function(a, b) {
        return b.likes - a.likes;
      });
      console.log("pushed sortByPopularity");
      console.log(this.results);
      this.hasResult = true;
    },
    sortByCookingDuration: function() {
      console.log("pushed cooking duration");
      this.hasResult = false;
      this.results.sort(function(a, b) {
        return a.cookingDuration - b.cookingDuration;
      });
      this.hasResult = true;
    },
    cusinesSelected(value) {
      console.log(value);
      this.cusineChoose = value;
    },
    dietSelected(value) {
      this.dietChoose = value;
    },
    intolerancesSelected(value) {
      this.intolerancesChoose = value;
    },
    async getUserInformation(recipes) {
      let recipeIDArray = [];
      recipes.map((x) => recipeIDArray.push(x.recipeID));
      console.log(recipeIDArray);
      let info = await this.axios.get(
        "https://assignment3-2-shiran-hen.herokuapp.com/user/search/" +
          JSON.stringify(recipeIDArray)
      );
      let newRecipes = [];
      info.data.forEach((element) => {
        let recipe = recipes.find((el) => el.recipeID == element.recipeID);
        recipe.isWatch = element.isWatch;
        recipe.isFavorite = element.isFavorite;
        newRecipes.push(recipe);
      });
      return newRecipes;
    },
  },
};
</script>
