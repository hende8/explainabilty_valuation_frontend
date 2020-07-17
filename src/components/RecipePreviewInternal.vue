<template>
  <router-link 
    :to="{ name: 'recipeInternal', params: {recipeId: recipe.recipeID} }"
    class="card"
    style="width: 20rem;"
  >
    <div class="recipe-body">
      <img :src="recipe.imageURL" class="card-img-top" style="max-width:318px; min-width:318px max-height:230px; min-height:230px" />
    </div>
    <div class="card-body" style="max-height:200px; min-height:200px" >
      <div class="recipe-footer">
        <div :title="recipe.name" class="card-title">{{ recipe.name }}</div>
        <ul class="card-text">
            <b-row>
              <b-icon
                icon="clock"
                variant="dark"
                font-scale="1.3"
                style="margin-right:15px"
              ></b-icon>
              {{ recipe.cookingDuration }}
              minutes</b-row
            >

          <b-row v-if="recipe.isVegeterian">
              <img
                src="https://img.icons8.com/color/25/000000/vegetarian-mark.png"
                style="margin-right:13px"
              />
              Vegetarian
            </b-row>
            <b-row v-if="recipe.isVegan">
              <img
                src="https://img.icons8.com/color/25/000000/vegan-symbol.png"
                style="margin-right:13px"
              />
              Vegan
            </b-row>
            <b-row v-if="recipe.isGluten">
              <img
                src="https://img.icons8.com/color/25/000000/no-gluten.png"
                style="margin-right:13px"
              />
              Gluten free
            </b-row>
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
};
</script>

<style scoped>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}