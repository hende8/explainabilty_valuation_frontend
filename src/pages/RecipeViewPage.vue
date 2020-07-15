<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>

        <favoriteButton
          v-if="this.$root.store.username"
          :recipeID="recipe.recipeID"
          :isFavorite="this.isFavorite"
        ></favoriteButton>
        <!-- <div v-if="this.$root.store.username && this.isWatch"> watch</div> -->
        <img :src="recipe.imageURL" class="rounded mx-auto d-block" alt="Responsive image" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.cookingDuration }} minutes</div>
              <div>Likes: {{ recipe.likes }} likes</div>
              <div v-if="recipe.isVegeterian">vegeterian</div>
              <div v-if="recipe.isVegan">vegan</div>
              <div v-if="recipe.isGluten">gluten free</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.name }} : {{ r.qauntity }} {{ r.unit }}
              </li>
            </ul>

            <div>
              Instructions:
              <ul>
                <li
                  v-for="(r, index) in recipe.instructions"
                  :key="index + '_' + r.number"
                >
                  {{ r.step }}
                </li>
              </ul>
            </div>
            <div>Number of dishes: {{ recipe.dishes }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import favoriteButton from "../components/favoriteButton";
export default {
  components: {
    favoriteButton,
  },
  data() {
    return {
      recipe: null,
      isWatch: false,
      isFavorite: false,
    };
  },
  async created() {
    try {
      let response;
      try {
        console.log(this.$route.params.recipeId);
        response = await this.axios.get(
          "https://assignment3-2-shiran-hen.herokuapp.com/recipes//information/" +
            this.$route.params.recipeId
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
        if (this.$root.store.username) {
          let recipeIDArray = [this.$route.params.recipeId];
          let info = await this.axios.get(
            "https://assignment3-2-shiran-hen.herokuapp.com/user/search/" +
              JSON.stringify(recipeIDArray)
          );
          this.isWatch = info.data[0].isWatch;
          this.isFavorite = info.data[0].isFavorite;
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
        dishes,
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
        dishes,
      };

      this.recipe = _recipe;
      if (this.$root.store.username) {
        response = this.axios.post(
          "https://assignment3-2-shiran-hen.herokuapp.com/user/myWatch",
          {
            recipeID: this.recipe.recipeID,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
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
</style>
