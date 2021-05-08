<template>
  <div class="container">
    <div>
      <b-card
        title="Error analysis using predictions’ explanations"
        sub-title=""
      >
        <b-card-text>
          The plots in this screen present the features the most contributed to
          correct predictions and to wrong predictions. This analysis may assist
          you to understand the weak and strong points in your models and using
          this information you can try to improve your model.
        </b-card-text>

        <b-button
          @click="getShapByErrors()"
          variant="primary"
          type="submit"
          v-show="!spinner && this.images.length == 0"
          >Show graphs</b-button
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
          <h5>it may take a few minutes...</h5>
        </div>
        <div>
          <b-card-group deck v-for="img in images" :key="img" v-show="!spinner">
            <b-card no-body class="overflow-hidden" style="max-width: 2000px">
              <b-row no-gutters>
                <b-col md="9">
                  <b-card-img
                    :src="img"
                    alt="Image"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>

              </b-row>
            </b-card>
          </b-card-group>
        </div>
        <div style="text-align: center; padding: 20px">
          <b-button
            v-show="this.images.length > 0"
            @click="clearImages"
            type="submit"
            variant="primary"
            >Clear</b-button
          >
        </div>
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
  props: {
    explanation_model: String,
  },

  methods: {
    async getShapByErrors() {
      try {
        this.spinner = true;
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);
        formData.append("label", this.$root.store.target_feature);
        var path = "";
        if (this.explanation_model == "SHAP") {
          path = "http://localhost:5000/MakeShapModel/GetShapByErrors";
        } else {
          path = "http://localhost:5000/MakeLimeModel/GetLimeByErrors";
        }
        const response = await this.axios.post(
          // "http://localhost:5000/MakeShapModel/GetShapByErrors",
          path,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        if (this.explanation_model == "SHAP") {
          app_data.shap_by_errors = response.data.data;
        } else {
          app_data.lime_by_errors = response.data.data;
        }
        this.images = response.data.data;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clearImages() {
      if (this.explanation_model == "SHAP") {
        app_data.shap_by_errors = undefined;
      } else {
        app_data.lime_by_errors = undefined;
      }
      this.images = [];
    },
  },
  mounted() {
    if (
      app_data.shap_by_errors != undefined ||
      app_data.lime_by_errors != undefined
    ) {
      if (this.explanation_model == "SHAP") {
        this.images = app_data.shap_by_errors;
      } else {
        this.images = app_data.lime_by_errors;
      }
    }
  },
};
</script>

<style scoped>
</style>
