<template>
  <div class="container">
    <br />
    <h1 style="text-align:center; color:whitesmoke;">My Favorite Recipes</h1>
    <br />
    <div v-if="this.myFavoriteRecipes == undefined" style=" text-align:center;">
      <strong style="color:whitesmoke; ">Loading...</strong>
      <!-- <b-spinner class="ml-auto"></b-spinner> -->
    </div>
    <h3 v-if="this.myFavoriteRecipes == false" style="text-align:center;">
      No recipes
    </h3>

    <b-row cols="3" v-else>
      <b-col v-for="item in this.myFavoriteRecipes" :key="item.recipeID">
        <RecipePreview class="recipePreview" :recipe="item" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";

export default {
  data() {
    return {
      myFavoriteRecipes: undefined,
    };
  },
  components: {
    RecipePreview,
  },
  created() {
    this.getmyFavoriteRecipes();
  },
  methods: {
    async getmyFavoriteRecipes() {
      if (!this.$store.myFavorite) {
        let link =
          // "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes";
          "http://localhost:3000/user/myFavoriteRecipes";
        let response = this.axios
          .get(link)
          .then((res) => {
            let temp = [];
            temp.push(...res.data);
            if (temp.length == 0) {
              this.myFavoriteRecipes = false;
            } else {
              temp.map((x) => {
                x.isFavorite = true;
                x.isWatch = true;
              });
              this.myFavoriteRecipes = temp;
              this.$store.myFavorite = this.myFavoriteRecipes;
            }
          })
          .catch((err) => {
            if (err.response.status == "401") {
              this.$router.push("/login");
            } else {
              this.$router.push("/NotFound");
            }
          });
      } else {
        this.myFavoriteRecipes = this.$store.myFavorite;
      }
    },
  },
};
</script>

<style></style>
