<template>
  <div>
    <h1 style="text-align:center; color:whitesmoke;">My Family Recipes</h1>
    <br />
    <div v-if="this.myFamilyRecipes== undefined" style=" text-align:center;">
      <strong style="color:whitesmoke; ">Loading...</strong>
      <!-- <b-spinner class="ml-auto"></b-spinner> -->
    </div>
      <h3 v-if="this.myFamilyRecipes == false" style="text-align:center; color:whitesmoke;">No recipes</h3>
    <b-col cols="5" v-else>
      <b-row v-for="item in this.myFamilyRecipes" :key="item.recipeID">
        <RecipeFamilyPreview class="recipePreview" :recipe="item" />
        <br />
        <br />
      </b-row>
    </b-col>
  </div>
</template>

<script>
import RecipeFamilyPreview from "../components/RecipeFamilyPreview";

export default {
  data() {
    return {
      myFamilyRecipes: undefined,
    };
  },
  components: {
    RecipeFamilyPreview,
  },
  mounted() {
    this.getMyFamilyRecipes();
  },
  methods: {
    async getMyFamilyRecipes() {
      if (!this.$store.myFamily) {
        // let link = 'https://assignment3-2-shiran-hen.herokuapp.com/user/myFamilyRecipes'
        let link = "http://localhost:3000/user/myFamilyRecipes";
        let response = this.axios
          .get(link)
          .then((res) => {
            this.myFamilyRecipes = res.data.message;
            if (this.myFamilyRecipes.length == 0) {
              this.myFamilyRecipes = false;
            } else {
              this.$store.myFamily = this.myFamilyRecipes;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.myFamilyRecipes = this.$store.myFamily;
      }
    },
  },
};
</script>

<style></style>
