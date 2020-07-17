<template>
  <div class="container" style=" color:whitesmoke;">
    <h1 style="text-align:center;">My Favorite Recipes</h1>
        <div v-if="this.myFavoriteRecipes == undefined" style=" text-align:center;">
      <strong style="color:whitesmoke; ">Loading...</strong>
      <!-- <b-spinner class="ml-auto"></b-spinner> -->
    </div>
    <h3 v-if="this.myFavoriteRecipes == false" style="text-align:center;">No recipes</h3>
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
            let temp = [];
            temp.push(...res.data);
            if(temp.length==0){
              this.myFavoriteRecipes=false;
            }else{
            temp.map((x) => {
              x.isFavorite = true;
              x.isWatch = true;
            });
            this.myFavoriteRecipes = temp;
            this.$store.myFavorite=this.myFavoriteRecipes;
            }

          })
          .catch((err) => {
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
