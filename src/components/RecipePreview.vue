<template>
  <router-link
    :to="{ name: 'recipe', params: {recipeId: recipe.recipeID } }"
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
            <!-- <img src="../assets/time.png" class="recipe-info-icon" /> -->
            {{ recipe.cookingDuration }} minutes
          </li>
          <li>
            <!-- <img src="../assets/like.png" class="recipe-info-icon" /> -->
            {{ recipe.likes }} likes
          </li>
          <li v-if="recipe.isVegeterian">vegeterian</li>
          <li v-if="recipe.isVegan">vegan</li>
          <li v-if="recipe.isGluten">gluten!</li>
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
  }
};
</script>

<style scoped>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 100;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 70%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: 70%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.recipe-info-icon {
  width: 50%;
} */
</style>
