<template>
  <router-link 
    :to="{ name: 'recipeInternal', params: {recipeId: recipe.recipeID} }"
    class="card"
    style="width: 20rem;"
  >
    <div class="recipe-body">
      <img :src="recipe.imageURL" class="card-img-top" />
    </div>
    <div class="card-body">
      <div class="recipe-footer">
        <div :title="recipe.name" class="card-title">{{ recipe.name }}</div>
        <ul class="card-text">
          <li>
            {{ recipe.cookingDuration }} minutes
          </li>
          <li v-if="recipe.isVegeterian">vegeterian</li>
          <li v-if="recipe.isVegan">vegan</li>
          <li v-if="!recipe.isGluten">gluten!</li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods:{


  }
};
</script>

<style scoped>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}