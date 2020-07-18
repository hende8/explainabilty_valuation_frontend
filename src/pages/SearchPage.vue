<template>
  <div class="container">
    <br />
    <h1 class="title" style="text-align:center; color:whitesmoke;">Search</h1>
    <br />
    <b-navbar
      type="light"
      variant="light"
      style="border-radius: 25px;  width: 1100px;height: 200px;"
    >
      <b-nav-form>
        <b-row class="my-1">
          <b-col md="9">
            <b-form-input
              id="search"
              v-model="$v.form.search.$model"
              placeholder="Search"
              label-for="search"
              type="text"
              style="margin-right:14px;width:500px"
              :state="validateState('search')"
              size="lg"
            ></b-form-input>
            <b-form-invalid-feedback
              v-if="$v.form.search.length"
            ></b-form-invalid-feedback>
          </b-col>
        </b-row>
        <span style="margin-right: 10px;">
          <b>Number of results:</b>
        </span>
        <b-dropdown
          id="numResult"
          class="mr-sm-2"
          style="width:65px;"
          :text="buttonTitle"
        >
          <b-dropdown-item @click="numResult('5')">5</b-dropdown-item>
          <b-dropdown-item @click="numResult('10')">10</b-dropdown-item>
          <b-dropdown-item @click="numResult('15')">15</b-dropdown-item>
        </b-dropdown>
        <br />
        <br />
        <br />
        <br />
        <b-row>
          <b>
            <b-form-group
              class="mr-sm-2"
              label="Cuisine:"
              label-for="Cusines"
              style="margin-left:16px;"
            >
              <b-form-select
                id="cusineChoose"
                v-model="cusineChoose"
                :options="cusines"
                v-on:change="cusinesSelected"
                style="margin-right: 32px;margin-left: 10px;"
              ></b-form-select>
            </b-form-group>
          </b>
          <b>
            <b-form-group
              class="mr-sm-2"
              label="Intolerance: "
              label-for="Intolerances"
            >
              <b-form-select
                v-model="intolerancesChoose"
                id="intolerances"
                :options="intolerances"
                v-on:change="intolerancesSelected"
                style="margin-right: 32px;margin-left: 10px;"
              ></b-form-select>
            </b-form-group>
          </b>
          <b>
            <b-form-group label="Diet:" label-for="Diet">
              <b-form-select
                v-model="dietChoose"
                id="diets"
                :options="diets"
                v-on:change="dietSelected"
                style="margin-right: 32px;margin-left: 10px;"
              ></b-form-select>
            </b-form-group>
          </b>
        </b-row>
      </b-nav-form>

      <b-button
        variant="primary"
        class="my-2 my-sm-4"
        type="submit"
        @click="onSearch"
        style="width:150px;height:60px;margin-right:110px; "
        >Search</b-button
      >
    </b-navbar>
    <div>
      <b-row cols="3" v-if="hasLastSearch && !this.hasResult">
        <b-col v-for="item in lastSearchResults" :key="item.recipeID">
          <RecipePreview :recipe="item" style="margin-top: 16px;" />
        </b-col>
      </b-row>
    </div>
    <br />
    <div>
      <b-row v-if="this.hasResult" >
        <b style=" color:whitesmoke;">
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
        </b>
        <b-row cols="3">
          <b-col v-for="item in results" :key="item.recipeID">
            <RecipePreview :recipe="item" style="margin-top: 16px;" />
          </b-col>
        </b-row>
      </b-row>
      <h1 v-if="this.notFoundRecipes" style=" color:whitesmoke;" >Search not found , try again!</h1>
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
      buttonTitle: "5",
    };
  },
  validations: {
    form: {
      search: {
        required,
        length: (u) => minLength(1)(u),
        alpha,
      },
    },
  },
  components: {
    RecipePreview,
  },
  async created() {
    let lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (this.$root.store.username && lastSearch) {
      this.hasLastSearch = true;
      this.lastSearchResults = await this.getUserInformation(lastSearch);
    }
  },
  computed: {},
  methods: {
    async searchRecipes(req, response) {
      try {
        let link =
          // "https://assignment3-2-shiran-hen.herokuapp.com/recipes/search/query/";
          "http://localhost:3000/recipes/search/query/";
        // var link = "http://localhost:3000/recipes/search/query/";

        link += this.search + "/number/" + this.numberOfResults.toString();

        response = await this.axios.get(link, {
          params: {
            cuisine: this.cusineChoose,
            intolerances: this.intolerancesChoose,
            diet: this.dietChoose,
          },
        });
      } catch (err) {
      }
      if (response.status == "200") {
        this.hasResult = false;
        this.hasResult = true;
        
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
      this.lastSearchResults=null;
      this.search = this.form.search;
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
        if (this.$root.store.username) {
          this.hasResult = true;
          // this.$store.lastSearch = data;
          localStorage.setItem("lastSearch", JSON.stringify(data));
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
      this.results.sort(function(a, b) {
        return b.likes - a.likes;
      });
      this.hasResult = true;
    },
    sortByCookingDuration: function() {
      this.hasResult = false;
      this.results.sort(function(a, b) {
        return a.cookingDuration - b.cookingDuration;
      });
      this.hasResult = true;
    },
    cusinesSelected(value) {
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
      let info = await this.axios.get(
        // "https://assignment3-2-shiran-hen.herokuapp.com/user/search/" +
        "http://localhost:3000/user/search/" + JSON.stringify(recipeIDArray)
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
<style></style>
