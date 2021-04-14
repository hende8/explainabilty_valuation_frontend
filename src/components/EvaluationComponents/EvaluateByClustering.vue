<template>
  <div class="container">
    <div>
      <b-card title="Evaluation By Clustering" sub-title="">
        <b-card-text>
          Consistency by entropy of ranked attributing features to prediction:
          In this evaluation you can see the entropy of ranked features that
          attribute to the prediction (the first is the most attributing) in
          instances that were clustered together. If the entropy in a cluster is
          higher, then the explaining features (features that attributed to the
          prediction) are ranked in a similar way Consistency by clustering
          similarity: In this evaluation the consistency is measured by the
          similarity of clusters of instances with clusters by the explanations
          of the instances. A higher similarity means that similar instances
          were clustered together and also their explanations were clustered
          together.

          <br />
          <br />
          This feature check the consistent of clusters inteersection
          <div v-show="!spinner">
            <label for="sb-inline">Choose number of clusters: </label>
            <b-form-spinbutton
              id="sb-inline"
              v-model="cluster_value"
              inline
            ></b-form-spinbutton>

            <!-- <b-button
              @click="getEvaluationByClustering()"
              variant="primary"
              style="margin-left:10px;"
              v-show="!spinner"
              >Get graphs</b-button
            > -->
          </div>

          <b-button
            @click="getEvaluationByClustering()"
            variant="primary"
            style="width: 90px"
            class="ml-5 w-10"
            v-show="!spinner"
            >Get graphs</b-button
          >
          <h2>{{ SHAP_info_message }}</h2>
          <h2>{{ lime_info_message }}</h2>

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

          <div id="toggles">
            <!-- Using modifiers -->
            <b-button
              v-show="!spinner && SHAP_images.length > 0"
              v-b-toggle="'collapse-1'"
              class="m-1"
              >Show LIME Clusters Plots</b-button
            >

            <!-- Using value -->
            <b-button
              v-show="!spinner && SHAP_images.length > 0"
              v-b-toggle="'collapse-2'"
              class="m-1"
              >Show SHAP Clusters Plots</b-button
            >

            <!-- Element to collapse -->
            <b-collapse id="collapse-2">
              <b-card-group deck v-for="img in SHAP_images" :key="img">
                <b-card
                  no-body
                  class="overflow-hidden"
                  style="max-width: 2000px"
                >
                  <b-row no-gutters>
                    <b-col md="6">
                      <b-card-img
                        :src="img"
                        alt="Image"
                        class="rounded-0"
                      ></b-card-img>
                    </b-col>
                  </b-row>
                </b-card>
              </b-card-group>
            </b-collapse>

            <b-collapse id="collapse-1">
              <b-card-group deck v-for="img in lime_images" :key="img">
                <b-card
                  no-body
                  class="overflow-hidden"
                  style="max-width: 2000px"
                >
                  <b-row no-gutters>
                    <b-col md="6">
                      <b-card-img
                        :src="img"
                        alt="Image"
                        class="rounded-0"
                      ></b-card-img>
                    </b-col>
                  </b-row>
                </b-card>
              </b-card-group>
            </b-collapse>
            <div style="text-align: center; padding: 20px">
              <b-button
                @click="clear()"
                variant="primary"
                style="width: 90px"
                class="ml-5 w-10"
                v-show="!spinner && SHAP_images.length > 0"
                >Clear</b-button
              >
            </div>
          </div>

          <!-- <div v-show="spinner">
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
          </div> -->
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
      SHAP_images: [],
      lime_images: [],
      SHAP_info_message: "",
      lime_info_message: "",
      spinner: false,
    };
  },

  methods: {
    async getEvaluationByClustering() {
      this.SHAP_images = [];
      this.lime_images = [];
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

        console.log(response.data);
        this.SHAP_images = response.data.SHAP_data;
        this.lime_images = response.data.lime_data;
        app_data.evaluation_by_clustering={
          SHAP_images:response.data.SHAP_data,
          SHAP_info_message:response.data.SHAP_info_message,
          lime_images:response.data.lime_data,
          lime_info_message:response.data.lime_info_message
        }
        this.SHAP_info_message = response.data.SHAP_info_message;
        this.lime_info_message = response.data.lime_info_message;
        this.spinner = false;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clear() {
      this.SHAP_images = [];
      this.lime_images = [];
      (this.SHAP_info_message = ""),
        (this.lime_info_message = ""),
        (app_data.evaluation_by_clustering = []);
        app_data.evaluation_by_clustering=undefined


    },
  },
  mounted(){
    if(app_data.evaluation_by_clustering !=undefined){
      this.SHAP_images=app_data.evaluation_by_clustering.SHAP_images;
      this.SHAP_info_message=app_data.evaluation_by_clustering.SHAP_info_message;
      this.lime_images=app_data.evaluation_by_clustering.lime_images;
      this.lime_info_message=app_data.evaluation_by_clustering.lime_info_message;
    }
  }
};
</script>

<style scoped>
</style>
