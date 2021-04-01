<template>
  <div class="container">
    <div>
      <b-card title="Evaluation By Clustering" sub-title="">
        <b-card-text>
          <div v-show="!spinner">
            <label for="sb-inline">Choose number of clusters: </label>
            <b-form-spinbutton
              id="sb-inline"
              v-model="cluster_value"
              inline
            ></b-form-spinbutton>

            <b-button
              @click="getEvaluationByClustering()"
              variant="primary"
              style="margin-left:10px;"
              v-show="!spinner"
              >Get graphs</b-button
            >
          </div>

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
                    <b-card-body title="Consistent level">
                      <b-card-text>
                        {{ info_message }}
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-group>
                      <div style="text-align: center;padding: 20px;">

            <b-button
              @click="clear()"
              variant="primary"
              style="width: 90px"
              class="ml-5 w-10"
              v-show="!spinner && this.images.length > 0"
              >Clear</b-button
            >
            </div>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import app_data from "../../assets/app_data";

export default {
  data() {
    return {
      cluster_value: 11,
      images: [],
      info_message: "",
      spinner: false,
    };
  },

  methods: {
    async getEvaluationByClustering() {
      this.images = [];
      this.spinner = true;
      try {
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        let f =
          "gender,age_group,symptom_well,symptom_sore_throat,symptom_cough,symptom_shortness_of_breath,symptom_smell_or_taste_loss,symptom_fever,condition_any";
        formData.append("features", f);
        formData.append("label", "label");
        formData.append("clustersNum", this.cluster_value);
        const response = await this.axios.post(
          "http://localhost:5000/ShapEvaluation/GetShapEvaluationByClusters",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        this.images = response.data.data;
        app_data.evaluation_by_clustering = this.images;
        this.info_message = response.data.info_message;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clear() {
      this.images = [];
      app_data.evaluation_by_clustering = [];
    },
  },
};
</script>

<style scoped>
</style>
