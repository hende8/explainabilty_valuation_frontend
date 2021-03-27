<template>
  <div class="container">
    <h1>Explanation to be added</h1>
    
    <b-button
      @click="GetShapByErrors"
      variant="primary"
      style="width: 90px"
      class="ml-5 w-10"
      >Get graphs</b-button
    >    

  <!-- <b-card  no-body class="overflow-hidden" style="max-width: 1700px;" v-for="r in this.images" :key="r.details">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="r.url" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Horizontal Card">
          <b-card-text>
            This is a wider card with supporting text as a natural lead-in to additional content.
            This content is a little bit longer.
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        images:[],
    };
  },

  methods: {
    async test() {
      let info = await this.axios.get(
        "http://localhost:8080/shap/GetShapByErrors/"
      );
      errors_plot = [];
      info.data.forEach((element) => {
        errors_plot.push(element);
      });

      return newRecipes;
    },
  },
};
</script>

<style scoped>
</style>
