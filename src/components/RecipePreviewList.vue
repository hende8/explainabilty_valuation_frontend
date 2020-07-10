<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   "https://assignment3-2-shiran-hen.herokuapp.com/recipes/randomRecipes"
        // );

        // console.log(response);
                      let ans = [
    {
        "recipeID": 635350,
        "imageURL": "https://spoonacular.com/recipeImages/635350-556x370.jpg",
        "name": "Blue Cheese Burgers",
        "cookingDuration": 45,
        "likes": 7,
        "isVegeterian": false,
        "isVegan": false,
        "isGluten": false
    },
    {
        "recipeID": 642539,
        "imageURL": "https://spoonacular.com/recipeImages/642539-556x370.png",
        "name": "Falafel Burger",
        "cookingDuration": 45,
        "likes": 4,
        "isVegeterian": true,
        "isVegan": false,
        "isGluten": false
    },
    {
        "recipeID": 650181,
        "imageURL": "https://spoonacular.com/recipeImages/650181-556x370.jpg",
        "name": "Little Italy Burger",
        "cookingDuration": 45,
        "likes": 1,
        "isVegeterian": false,
        "isVegan": false,
        "isGluten": false
    }]
        // const recipes = response.data;
        const recipes = ans;
        this.recipes = [];
        this.recipes.push(...recipes);

        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
