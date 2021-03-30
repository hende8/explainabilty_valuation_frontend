<template>
  <div class="container">
    <h2>You are more than walcome to use our innovative tool.... TO BE CONTINUE</h2>
    <b-button
      v-show="this.image == undefined"
      @click="getGraphAllData"
      type="submit"
      variant="primary"
      >get graph</b-button
    >
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
                  This is a wider card with supporting text as a natural lead-in
                  to additional content. This content is a little bit longer.
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
  </div>
</template>

<script>
import app_data from "../../assets/app_data";

export default {
  data() {
    return {
      image: undefined,
    };
  },

  methods: {
    async getGraphAllData() {
      try {
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

        this.image = response.data;
        app_data.shap_full_data=this.image
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clearImage(){
      this.image=undefined
      app_data.shap_full_data=undefined
    },
  },
  mounted(){
      if (app_data.shap_full_data != undefined) {
        this.image=app_data.shap_full_data
      }

  }
};
</script>

<style scoped>
</style>
