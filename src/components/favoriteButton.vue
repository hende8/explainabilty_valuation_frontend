<template type="text/x-template" id="template-favorite">
  <b-icon
    class="favorite"
    v-if="this.favorite"
    icon="star-fill"
    font-scale="1.5"
    variant="warning"
    @click="removeMyFavorite"
    type="button"
  >
  </b-icon>
  <b-icon
    v-else
    class="favorite"
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
        // "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes",
        "http://localhost:3000/user/myFavoriteRecipes",
        {
          recipeID: this.recipeID,
        }
      );
      this.favorite = true;
      this.$store.myFavorite = undefined;
    },
    async removeMyFavorite() {
      let response = await this.axios.delete(
        // "https://assignment3-2-shiran-hen.herokuapp.com/user/myFavoriteRecipes/" +
        "http://localhost:3000/user/myFavoriteRecipes/" +
          this.recipeID
      );
      this.favorite = false;
      this.$store.myFavorite = undefined;
    },
  },
};
</script>

<style scoped>
.favorite:hover {
box-shadow: 0px 6px 21px  }
</style>
