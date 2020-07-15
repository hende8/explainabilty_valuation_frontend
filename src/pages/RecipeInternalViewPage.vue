<template>
  <div v-if="recipes.length>0">
    <b-card no-body class="overflow-hidden" style="max-width: 90%;left:5%;right:8%">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="recipes[0].imageURL" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="recipes[0].name">
            <b-card-text>
              <b-list-group flush>
                <b-list-group-item>
                  <b-icon icon="clock" variant="dark" style="margin-right:10px"></b-icon>
                  {{ recipes[0].cookingDuration }} Minutes
                </b-list-group-item>
                <b-list-group-item v-if="recipes[0].isVegan">Vegan</b-list-group-item>
                <b-list-group-item v-if="!recipes[0].isGluten">Gluten free</b-list-group-item>
                <b-list-group-item>Number of dishes: {{recipes[0].dishes}}</b-list-group-item>
                <b-list-group-item>
                  Ingredients:
                  <ul>
                    <li
                      v-for="ingred in recipes[0].ingredients"
                      :key="ingred.recipeID"
                    >{{ingred.name}} : {{ingred.quantity}} {{ingred.unit}}</li>
                  </ul>
                </b-list-group-item>
                <b-list-group-item>
                  <b>Instructions:</b>
                  {{recipes[0].instructions}}
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
// import RecipeInternalView from "../components/RecipeInternalView";
export default {
  data() {
    return {
      recipes: []
    };
  },

  mounted() {
    this.recipes = this.$store.recipes.filter(
      recipe => recipe.recipeID == this.$route.params.recipeId
    );
  }
};
</script>

<style>
</style>