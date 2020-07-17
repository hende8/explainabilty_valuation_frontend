<template>
  <div > 
    <h1  style=" text-align:center;  color:whitesmoke;">
      {{ title }}:
      <slot></slot>
    </h1>
    <div v-if="this.recipes== null"  style=" text-align:center;  color:whitesmoke;">
      <strong style="color:whitesmoke; ">Loading...</strong>
      <!-- <b-spinner class="ml-auto"></b-spinner> -->
    </div>
    <h3 v-if="this.recipes==false"  style=" text-align:center;  color:whitesmoke;"> No watched recipes</h3>
    <div v-else >
    <b-row  v-for="r in this.recipes" :key="r.id">
      <!-- <b-col > -->
      <RecipePreview class="p" :recipe="r" :key="render"></RecipePreview>
      <!-- </b-col> -->
    </b-row>
    </div>
    
    <!-- <button
      v-if="buttonAction"
      v-on:click="updateRandomRecipes()"
      type="button"
    >
      random
    </button> -->
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    rerender: {
      type: Number,
    },
  },
  data() {
    return {
      recipes: null,
      buttonAction: true,
      render: 0,
    };
  },
  async mounted() {
    if (this.action == "random") {
      this.updateRandomRecipes();
    } else {
      this.updateLastView();
      this.buttonAction = false;
    }
  },
  methods: {
    async updateRandomRecipes() {
      try {
        // const response = await this.axios.get(
        //   "http://localhost:3000/recipes/randomRecipes"
        // );
        let recipes = [
          {
            recipeID: 635350,
            imageURL: "https://spoonacular.com/recipeImages/635350-556x370.jpg",
            name: "Blue Cheese Burgers",
            cookingDuration: 45,
            likes: 7,
            isVegeterian: false,
            isVegan: false,
            isGluten: false,
          },
          {
            recipeID: 642539,
            imageURL: "https://spoonacular.com/recipeImages/642539-556x370.png",
            name: "Falafel Burger",
            cookingDuration: 45,
            likes: 4,
            isVegeterian: true,
            isVegan: false,
            isGluten: false,
          },
        ];

        // console.log(response);
        // const recipes = response.data;
        // this.recipes = [];
        // this.recipes.push(...recipes);
        if (this.$root.store.username) {
          await this.getUserInformation(recipes);
        } else {
          recipes.map((x) => {
            x.isFavorite = false;
          });
          this.recipes = [];
          this.recipes.push(...recipes);
        }
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async updateLastView() {
      try {
        let recipes = [];
        if (!this.$store.lastWatch) {
          const response = await this.axios.get(
            // "https://assignment3-2-shiran-hen.herokuapp.com/user/myWatch"
            "http://localhost:3000/user/myWatch"
          );

          recipes = response.data;
          if (recipes.length !== 0) {
            this.$store.lastWatch = recipes;
          }
        } else {
          recipes = this.$store.lastWatch;
        }

        if (recipes.length!==0) {
          this.getUserInformation(recipes);
        }else{
          this.recipes=false;
        }

        // this.recipes = [];
        // this.recipes.push(...recipes);

        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async getUserInformation(recipes) {
      let recipeIDArray = [];
      recipes.map((x) => recipeIDArray.push(x.recipeID));
      console.log(recipeIDArray);
      // let info = await this.axios.get(
      //   "https://assignment3-2-shiran-hen.herokuapp.com/user/search/" +
      //     JSON.stringify(recipeIDArray)
      // );
      let info = await this.axios.get(
        "http://localhost:3000/user/search/" + JSON.stringify(recipeIDArray)
      );
      let newRecipes = [];
      info.data.forEach((element) => {
        let recipe = recipes.find((el) => el.recipeID == element.recipeID);
        if (this.action == "random") {
          recipe.isWatch = element.isWatch;
        }
        recipe.isFavorite = element.isFavorite;
        newRecipes.push(recipe);
      });
      this.recipes = [];
      this.recipes.push(...newRecipes);
    },
  },
  watch: {
    rerender: async function() {
      console.log("shiraaam");
      await this.getUserInformation(this.recipes);
      console.log(this.recipes);

      this.render += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
// .p{
//   background-image: url("../assets/bgbody.jpg");
// }
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
