<template>
<div>
  <b-card  class="overflow-hidden" style="max-width: 1500px;">
    <b-row no-gutters>
      <b-col md="55">
        <b-card-img :src="recipe.imageURL" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="55">
        <b-card-body :title="recipe.name">
          <b-card-text>
              <li>
                Made by : {{recipe.owner}}
              </li>
              <li>
                Ingredients:
              </li>
              <ul>

              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >{{ r.name }} : {{r.quantity}} {{r.unit}}</li>
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
  }
};
</script>