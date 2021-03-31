<template>
  <div class="container">
    <div>
      <b-card title="Explain full data" sub-title="">
        <b-card-text>
          You are more than walcome to use our innovative tool.... TO BE
          CONTINUE
        </b-card-text>

        <b-card-text> to be CONTINUE </b-card-text>
        <b-button
          v-show="this.image == undefined && !spinner"
          @click="getGraphAllData"
          type="submit"
          variant="primary"
          >get graph</b-button
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
          <b-button @click="clearImage" type="submit" variant="primary"
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
      image: undefined,
      spinner: false,
    };
  },

  methods: {
    async getGraphAllData() {
      try {
        this.spinner = true;
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        let f =
          "gender,age_group,symptom_well,symptom_sore_throat,symptom_cough,symptom_shortness_of_breath,symptom_smell_or_taste_loss,symptom_fever,condition_any";
        formData.append("features", f);
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
