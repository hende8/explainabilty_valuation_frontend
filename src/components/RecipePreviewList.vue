<template>
  <div class="split left">
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-for="r in recipes" :key="r.id">
      <!-- <b-col > -->
      <RecipePreview class="recipePreview" :recipe="r"></RecipePreview>
      <!-- </b-col> -->
    </b-row>
    <button v-if="buttonAction" v-on:click="updateRandomRecipes()" type="button">random</button>
  </div>
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
    },
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      buttonAction: true
    };
  },
  mounted() {
    if (this.action == "random") {
      this.updateRandomRecipes();
    } else{
      this.updateLastView();
      this.buttonAction=false;
    }
  },
  methods: {
    async updateRandomRecipes() {
      try {
        const response = await this.axios.get(
          "https://assignment3-2-shiran-hen.herokuapp.com/recipes/randomRecipes"
        );
        // const recipes = [
        //   {
        //     recipeID: 635350,
        //     imageURL: "https://spoonacular.com/recipeImages/635350-556x370.jpg",
        //     name: "Blue Cheese Burgers",
        //     cookingDuration: 1001,
        //     likes: 7,
        //     isVegeterian: false,
        //     isVegan: false,
        //     isGluten: false
        //   },
        //   {
        //     recipeID: 642539,
        //     imageURL: "https://spoonacular.com/recipeImages/642539-556x370.png",
        //     name: "Falafel Burger",
        //     cookingDuration: 45,
        //     likes: 4,
        //     isVegeterian: true,
        //     isVegan: false,
        //     isGluten: false
        //   }
        // ];

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);

        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async updateLastView() {
      try {
        const response = await this.axios.get(
          "https://assignment3-2-shiran-hen.herokuapp.com/user/myWatch"
        );

        // console.log(response);
        const recipes = response.data;
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
// .container {
//   min-height: 400px;
// }
// .split {
//   height: 50%;
//   width: 50%;
//   // position: fixed;
//   z-index: 1;
//   // // top: 0;
//   overflow-x: hidden;
//   padding-top: 20px;
// }

// .left {
//   left: 0;
// }
</style>
