<template>
  <div class="container">
    <div>
      <b-card title="Evaluation By Counterfactual" sub-title="">
        <b-card-text>
          <b-card-text>
          In this feature, we seek to review and categorize research on
          counterfactual explanations, a specific class of explanation that
          provides a link between what could have happened had input to a model
          been changed in a particular way.
          <br />
          This feature change 2 features of instance by thier most importance
          explaination values. Then our tool compare between the prior predict
          result to the origin predict value. With this assumpation we evaluate
          the correctness of explaination values.
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
