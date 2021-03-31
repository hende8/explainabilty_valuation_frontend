<template>
  <div class="container">
    <h4>This is page for showing the evauation for explaination method</h4>

    <b-button
      @click="getEvaluationByEntropy()"
      variant="primary"
      style="width: 90px"
      class="ml-5 w-10"
      >Get graphs</b-button
    >
    <div>
      <!-- <b-card-group  deck v-for="img in images" :key="img"> -->
      <b-card-group deck v-for="(img, index) in this.images" :key="index">
        <b-card no-body class="overflow-hidden" style="max-width: 2000px">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="img" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="this.titles[index]">
                <b-card-text> {{ this.text[index] }} </b-card-text>
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
      titles: [],
      text: [],
    };
  },

  methods: {
    async getEvaluationByEntropy() {
      console.log("entropy");
      this.images = [];
      try {
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);
        formData.append("label", this.$root.store.target_feature);
        const response = await this.axios.post(
          "http://localhost:5000/ShapEvaluation/GetShapEvaluationByEntropy",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        this.text = response.data.text;

        this.titles = response.data.title;
        this.images = response.data.data;

        console.log(this.titles);

        console.log(this.images);
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
  },
};
</script>

<style scoped></style>
