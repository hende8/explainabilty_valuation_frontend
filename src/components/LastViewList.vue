<template>
  <b-container class="split right">
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "LastVeiwList",
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
    this.updatedLastView();
  },
  methods: {
    async updatedLastView() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/myWatch"
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
.container {
  min-height: 400px;
}
.split {
  height: 50%;
  width: 50%;
  // position: fixed;
  z-index: 1;
  // // top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.right {
  right: 0;
}
</style>
