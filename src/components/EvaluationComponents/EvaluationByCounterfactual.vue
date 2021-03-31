<template>
  <div class="container">
    <h1>Explanation to be added</h1>

    <b-button
      @click="getEvaluationByCounterfactual()"
      variant="primary"
      style="width: 90px"
      class="ml-5 w-10"
      >Get graphs</b-button>
    <div>
      <b-card-group  deck v-for="img in images" :key="img">
        <b-card no-body class="overflow-hidden" style="max-width: 2000px">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="img"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Horizontal Card">
                <b-card-text>
                  This is a wider card with supporting text as a natural lead-in
                  to additional content. This content is a little bit longer.
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    };
  },

  methods: {
    async getEvaluationByCounterfactual() {
      this.images=[]
      try {
        var formData = new FormData();
        formData.append("data",this.$root.store.data)
        formData.append("model",this.$root.store.model)
        formData.append("features",this.$root.store.features)
        formData.append("label",this.$root.store.target_feature)
        const response = await this.axios.post(
          'http://localhost:5000/ShapEvaluation/GetShapEvaluationByCounterfactual',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          });

        console.log(response.data)
        this.images= response.data.data
        console.log(this.images)

      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },

  }
};
</script>

<style scoped>
</style>
