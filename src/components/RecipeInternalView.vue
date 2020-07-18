<template>
  <div>

  <b-card no-body class="overflow-hidden" style="max-width: 90%;">
    <br>
<br>
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="recipe.imageURL" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body :title="recipe.name">
          <b-card-text>
                      <b-list-group flush>
            <b-list-group-item>              <b-icon icon="clock" variant="dark" style="margin-right:10px"></b-icon>
{{ recipe.cookingDuration }} Minutes</b-list-group-item>
            <b-list-group-item v-if="recipe.isVegan">Vegan</b-list-group-item>
            <b-list-group-item v-if="!recipe.isGluten">Gluten free</b-list-group-item>
            <b-list-group-item>Number of dishes: {{recipe.dishes}}</b-list-group-item>
            <b-list-group-item>
              Ingredients:
              <ul>
                <li
                  v-for="ingred in recipe.ingredients"
                  :key="ingred.recipeID"
                >{{ingred.name}} : {{ingred.quantity}} {{ingred.unit}}</li>
              </ul>
            </b-list-group-item>
            <b-list-group-item>
              <b>Instructions: </b>
               {{recipe.instructions}}
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
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>

</style>