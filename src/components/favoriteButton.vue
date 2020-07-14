<template type="text/x-template" id="template-favorite">
  <b-icon
    v-if="this.favorite"
    icon="star-fill"
    font-scale="1.5"
    variant="warning"
    @click="removeMyFavorite"
  ></b-icon>
  <b-icon
    v-else
    icon="star"
    @click="addToMyFavorite"
    font-scale="1.5"
    variant="warning"
    type="button"
  ></b-icon>
  <!-- <button @click="addToMyFavorite">favorite</button> -->
</template>

<script>
export default {
  name: "favoriteButton",
  data() {
    return {
      favorite: false,
    };
  },
  props: {
    recipeID: {
      type: Number,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.favorite = this.isFavorite;
  },
  methods: {
    async addToMyFavorite() {
      let response = this.axios.post(
        "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes",
        {
          recipeID: this.recipeID,
        }
      );
      this.favorite = true;
    },
    async removeMyFavorite() {
      let response =  await this.axios.delete(
        "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes/"+this.recipeID
      );
      this.favorite = false;
    },
  },
};
</script>

<style scoped></style>
