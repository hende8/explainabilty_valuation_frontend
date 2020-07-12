<template  type="text/x-template" id="template-favorite">
  <button @click="addToMyFavorite">favorite</button>
</template> 

<script>
export default {
  name: "favoriteButton",
  props: {
    recipeID: {
      type: Number,
      required: true
    }
  },
  methods: {
    async addToMyFavorite() {
      let response = this.axios.post(
        "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes",
        {
          recipeID: this.recipeID
        }
      );
    }
  }
};
</script>


<style scoped>
</style>
