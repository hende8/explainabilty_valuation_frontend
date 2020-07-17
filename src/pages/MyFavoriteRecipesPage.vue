<template>
  <div class="container" style=" color:whitesmoke;">
    <h1 style="text-align:center;">My Favorite Recipes</h1>
    <b-row cols="3">
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
      myFavoriteRecipes: [],
    };
  },
  components: {
    RecipePreview,
  },
  mounted() {
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
            console.log(this);
            console.log(res.data);
            let temp = [];
            temp.push(...res.data);
            temp.map((x) => {
              x.isFavorite = true;
              x.isWatch = true;
            });
            this.myFavoriteRecipes = temp;
            this.$store.myFavorite=this.myFavoriteRecipes;
          })
          .catch((err) => {
            // console.error(err);
            this.$router.push("/login");
          });
      }else{
          this.myFavoriteRecipes=this.$store.myFavorite;
      }
    },
  },
};
</script>

<style></style>
