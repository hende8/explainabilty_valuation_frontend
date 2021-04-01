<template>
  <div class="container">
    <div>
      <b-card
        title="Explain importance of each feature in the dataset"
        sub-title=""
      >
        <b-card-text>
          The idea behind SHAP feature importance is simple: Features with large
          absolute Shapley values are important.<br> Since we want the global
          importance, we sum the absolute Shapley values per feature across the
          data.
        </b-card-text>

        <b-button
          v-show="this.image == undefined && !spinner"
          @click="explainFullData"
          type="submit"
          variant="primary"
          >Show graph</b-button
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
        <div v-if="this.image != undefined">
          <b-card-group>
            <b-card no-body class="overflow-hidden" style="max-width: 2000px">
              <b-row no-gutters>
                <b-col md="8">
                  <b-card-img
                    :src="this.image"
                    alt="Image"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="8">
                  <b-card-body>
                    <b-card-text>
                      The mean absolute value of each feature over all the
                      instances (rows) of the dataset.
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
          <div style="text-align: center; padding: 20px">
            <b-button
              @click="clearImage"
              type="submit"
              variant="primary"
              style="margin: 0 auto"
              >Clear</b-button
            >
          </div>
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
      image: undefined,
      spinner: false,
    };
  },

  methods: {
    async explainFullData() {
      try {
        this.spinner = true;
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);
        const response = await this.axios.post(
          "http://localhost:5000/MakeShapModel/GetAllDataShap",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        this.image = response.data;
        app_data.shap_full_data = this.image;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clearImage() {
      this.image = undefined;
      app_data.shap_full_data = undefined;
    },
  },
  mounted() {
    if (app_data.shap_full_data != undefined) {
      this.image = app_data.shap_full_data;
    }
  },
};
</script>

<style scoped>
</style>
