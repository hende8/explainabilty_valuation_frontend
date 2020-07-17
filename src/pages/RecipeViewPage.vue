<template>
  <div class="center" style="width: 90%;">
    <div v-if="recipe">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="recipe.imageURL" alt="Image" class="rounded-0" ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="recipe.name">
              <favoriteButton
                v-if="this.$root.store.username"
                :recipeID="recipe.recipeID"
                :isFavorite="this.isFavorite"
              ></favoriteButton>
              <b-card-text>
                <b-list-group flush>
                  <b-list-group-item>
                    <b-icon icon="hand-thumbs-up" variant="dark" style="margin-right:10px"></b-icon>
                    {{ recipe.likes }} Likes
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-icon icon="clock" variant="dark" style="margin-right:10px"></b-icon>
                    {{ recipe.cookingDuration }} Minutes
                  </b-list-group-item>
                  <b-list-group-item v-if="recipe.isVegan">              <img
                src="https://img.icons8.com/color/25/000000/vegan-symbol.png"
                style="margin-right:13px"
              />Vegan</b-list-group-item>
                  <b-list-group-item v-if="recipe.isGluten">              <img
                src="https://img.icons8.com/color/25/000000/no-gluten.png"
                style="margin-right:13px"
              />Gluten free</b-list-group-item>
                  <b-list-group-item v-if="recipe.isVegeterian">              <img
                src="https://img.icons8.com/color/25/000000/vegetarian-mark.png"
                style="margin-right:13px"
              />Vegeterian</b-list-group-item>
                  <b-list-group-item>Number of dishes: {{recipe.dishes}}</b-list-group-item>
                  <b-list-group-item>
                    Ingredients:
                    <ul>
                      <li
                        v-for="ingred in recipe.ingredients"
                        :key="ingred.recipeID"
                      >{{ingred.name}} : {{ingred.qauntity}} {{ingred.unit}}</li>
                    </ul>
                  </b-list-group-item>
                  <b-list-group-item>
                    <b>Instructions:</b>
                    <ul>
                      <li
                        v-for="(r, index) in recipe.instructions"
                        :key="index + '_' + r.number"
                      >{{ r.step }}</li>
                    </ul>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    
  </div>
  
</template>

<script>
import favoriteButton from "../components/favoriteButton";
export default {
  components: {
    favoriteButton
  },
  data() {
    return {
      recipe: null,
      isWatch: false,
      isFavorite: false
    };
  },
  async created() {
    try {
      let response;
      try {
        console.log(this.$route.params.recipeId);
        response = await this.axios.get(
          // "https://assignment3-2-shiran-hen.herokuapp.com/recipes//information/" +
          "http://localhost:3000/recipes//information/" +
            this.$route.params.recipeId
        );
        console.log(response.data);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
        if (this.$root.store.username) {
          this.$store.lastWatch = undefined;

          let recipeIDArray = [this.$route.params.recipeId];
          let info = await this.axios.get(
            // "https://assignment3-2-shiran-hen.herokuapp.com/user/search/" +
            "http://localhost:3000/user/search/" +
              JSON.stringify(recipeIDArray)
          );
          this.isWatch = info.data[0].isWatch;
          this.isFavorite = info.data[0].isFavorite;
          console.log(info.data);
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        // analyzedInstructions,
        recipeID,
        imageURL,
        name,
        cookingDuration,
        likes,
        isVegeterian,
        isVegan,
        isGluten,
        ingredients,
        instructions,
        dishes
      } = response.data;

      // let _instructions = instructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        recipeID,
        imageURL,
        name,
        cookingDuration,
        likes,
        isVegeterian,
        isVegan,
        isGluten,
        ingredients,
        instructions,
        dishes
      };

      this.recipe = _recipe;
      if (this.$root.store.username) {
        response = this.axios.post(
          // "https://assignment3-2-shiran-hen.herokuapp.com/user/myWatch",
           "http://localhost:3000/user/myWatch",
          {
            recipeID: this.recipe.recipeID
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  // methods: {
  //     async addToMyFavorite() {
  //       let response= this.axios.post( "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes",{
  //        recipeID: this.recipe.recipeID
  //       });
  //     },
  // }
};
</script>

<style scoped>
/* .wrapper {
  display: flex;
} */
/* .wrapped {
  width: 50%;
} */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
.container{
filter: blur(8px);
}
</style>
