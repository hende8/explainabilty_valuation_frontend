<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.imageURL" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.cookingDuration }} minutes</div>
              <div>Likes: {{ recipe.likes }} likes</div>
            </div>Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >{{ r.name }} : {{r.qauntity}} {{r.unit}}</li>
            </ul>
            <div class="wrapped">
              Instructions: {{recipe.instructions}}
              <ol>
                <li v-for="s in recipe._instructions" :key="s.number">{{ s.step }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        console.log(this.$route.params.recipeId);

        response = await this.axios.get(
          "http://localhost:3000/recipes/information/" +
            this.$route.params.recipeId
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        // analyzedInstructions,
        recipeID,
        instructions,
        ingredients,
        likes,
        cookingDuration,
        imageURL,
        name
      } = response.data;

      // let _instructions = instructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        recipeID,
        instructions,
        ingredients,
        // _instructions,
        // analyzedInstructions,
        // extendedIngredients,
        likes,
        cookingDuration,
        imageURL,
        name
      };

      this.recipe = _recipe;
      if (this.$root.store.username) {
        response = await this.axios.post(
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
