<template>
  <div class="container">
    <div>
      <b-card title="Faithfulness" sub-title="">
        <b-card-text>
          <b-card-text>
In this evaluation we measure the faithfulness degree with regard to the target system by measuring the relevance of explanations in practical settings. We change the two most attributing features (determined by explanation method) to the closest instance in the dataset with an opposite label (the instance’s counterfactual) and compare between the probability of that opposite class between the explanation models. If this change caused a higher difference in the probabilities (before and after the change) in explanation method A than explanation method B, then explanation method A is more faithful to the target.
          </b-card-text>
          <b-button
            @click="getEvaluationByCounterfactual()"
            variant="primary"
            v-show="!spinner && this.images.length == 0"
            >Get graphs</b-button
          >
          <div v-show="spinner">
            <div style="position: fixed; /* or absolute */ top: 50%; left: 50%">
              <b-spinner
                style="width: 3rem; height: 3rem"
                label="Large Spinner"
              ></b-spinner>
              <b-spinner
                style="width: 3rem; height: 3rem"
                label="Large Spinner"
                type="grow"
              ></b-spinner>
              <br />
            </div>
            <h5>its may take a few minutes...</h5>
          </div>
          <div>
            <b-card-group deck v-for="img in images" :key="img">
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
                        This is a wider card with supporting text as a natural
                        lead-in to additional content. This content is a little
                        bit longer.
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-group>
            <div style="text-align: center; padding: 20px">
              <b-button
                @click="clear()"
                variant="primary"
                v-show="this.images.length > 0"
                >Clear</b-button
              >
            </div>
          </div></b-card-text
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import app_data from "../../assets/app_data";

export default {
  data() {
    return {
      images: [],
      spinner: false,
    };
  },

  methods: {
    async getEvaluationByCounterfactual() {
      this.images = [];
      this.spinner = true;
      try {
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);
        formData.append("label", this.$root.store.target_feature);
        const response = await this.axios.post(
          "http://localhost:5000/ShapEvaluation/GetShapEvaluationByCounterfactual",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        this.images = response.data.data;
        app_data.evaluation_by_counterfactual = this.images;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clear() {
      this.images = [];
      app_data.evaluation_by_counterfactual = undefined;
    },
  },
  mounted() {
    this.images = app_data.evaluation_by_counterfactual;
  },
};
</script>

<style scoped>
</style>
