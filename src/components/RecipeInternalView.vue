<template>
  <div>
  <b-card align="center" class="overflow-hidden" style="max-width: 1500px;" :title="recipe.name">
    <b-row no-gutters>
      <b-col md="55">
        <b-card-img :src="recipe.imageURL" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="55">
        <b-card-body >
          <b-card-text>
                        <li>
            {{ recipe.cookingDuration }} minutes
          </li>
                    <li v-if="recipe.isVegan">vegan</li>
          <li v-if="recipe.isGluten">gluten free</li>
              <li>
                Ingredients:
              </li>
              <ul>
                              </ul>
              <li>
                Instructions : {{recipe.instructions}}
              </li>
              <li>
                {{recipe.dishes}} dishes
              </li>
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
  },
}
</script>

<style>

</style>