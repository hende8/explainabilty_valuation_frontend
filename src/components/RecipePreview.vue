<template>
  <div class="card" style="width: 20rem;  ">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.recipeID } }"
    >
      <div class="recipe-body">
        <img  id="card1" :src="recipe.imageURL" class="card-img-top" style="max-width:318px; min-width:318px max-height:230px; min-height:230px"/>
      </div>
    </router-link>
    <div class="card-body" style="max-height:230px; min-height:230px">
      <b-row>
        <b-col>
          <b-icon
            v-if="recipe.isWatch && this.$root.store.username && !isInternal"
            icon="eye-fill"
            font-scale="1.3"
          ></b-icon>
        </b-col>
        <br />
        <div class="divider" />
        <b-col>
          <favoriteButton
            v-if="this.$root.store.username && !isInternal"
            :isFavorite="recipe.isFavorite"
            :recipeID="recipe.recipeID"
          ></favoriteButton>
        </b-col>
      </b-row>
        <div class="recipe-footer">
          <h6 :title="recipe.name" class="card-title">{{ recipe.name }}</h6>
          
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
            <b-row>
              <b-icon
                icon="hand-thumbs-up"
                variant="dark"
                font-scale="1.4"
                style="margin-right:15px"
              ></b-icon>
              {{ recipe.likes }}
              likes</b-row
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
  </div>
</template>

<script>
import favoriteButton from "./favoriteButton.vue";
export default {
  components: {
    favoriteButton,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    isInternal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.divider {
  display: inline-block;
  margin-right: 10em;
  
}
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
 
}
#card1:hover {
   transform: scale(1.02);
}

</style>
