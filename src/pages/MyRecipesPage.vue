<template>
  <div class="container" style=" color:whitesmoke;">
    <h1 style="text-align:center;">My Recipes</h1>
    <div v-if="this.myRecipes == undefined" style=" text-align:center;">
      <strong style="color:whitesmoke; ">Loading...</strong>
    </div>
    <h3 v-if="this.myRecipes == false" style="text-align:center;">No recipes</h3>
    <b-row cols="3" v-else>
      <b-col v-for="item in myRecipes" :key="item.recipeID">
        <RecipePreviewInternal class="recipePreview" :recipe="item" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewInternal from "../components/RecipePreviewInternal";

export default {
  data() {
    return {
      myRecipes: undefined,
    };
  },
  components: {
    RecipePreviewInternal,
  },
  mounted() {
    if (!this.$store.recipes) {
      // getMyRecipes();
      // let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myRecipes';
      let link = "http://localhost:3000/user/myRecipes";
      let response = this.axios
        .get(link)
        .then((res) => {
          this.myRecipes = res.data.message;
          if (this.myRecipes.length == 0) {
            this.myRecipes = false;
          } else {
            var dict = this.myRecipes;
            this.$store.recipes = dict;
          }
        })
        .catch((err) => {
            this.$router.push("/login");
        });
    } else {
      this.myRecipes = this.$store.recipes;
    }
  },

  methods: {
    getMyRecipes() {
      // let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myRecipes';
      let link = "http://localhost:3000/user/myRecipes";
      let response = this.axios
        .get(link)
        .then((res) => {
          console.log(res.data);
          myRecipes = res.data.message;
        })
        .catch((err) => {
            this.$router.push("/login");
        });
    },
  },
};
</script>

<style></style>
