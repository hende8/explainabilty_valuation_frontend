<template>
    <div>
      <b-card no-body class="overflow-hidden" style="width:1100px;left:250px">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="recipe.imageURL" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="recipe.name">
              <b-card-text>
                <b-list-group flush>
                  <b-list-group-item>
                    <b-icon icon="clock" variant="dark" style="margin-right:10px"></b-icon>
                    {{ recipe.cookingDuration }} Minutes
                  </b-list-group-item>
                  <b-list-group-item>Made by : {{recipe.owner}}</b-list-group-item>
                  <b-list-group-item>Cooking in : {{recipe.event}}</b-list-group-item>
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
                    <b>Instructions:</b>
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