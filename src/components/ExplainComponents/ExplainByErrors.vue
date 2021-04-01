<template>
  <div class="container">
    <div>
      <b-card title="Explain by errors" sub-title="">
        <b-card-text>
          You are more than walcome to use our innovative tool.... TO BE
          CONTINUE
        </b-card-text>

        <b-card-text> to be CONTINUE </b-card-text>
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
          <h5>its may take a few minutes...</h5>
        </div>
        <div>
          <b-card-group deck v-for="img in images" :key="img" v-show="!spinner">
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

  methods: {
    async getShapByErrors() {
      try {
        this.spinner = true;
        var formData = new FormData();
        formData.append("data", this.$root.store.data);
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);
        formData.append("label", this.$root.store.target_feature);
        const response = await this.axios.post(
          "http://localhost:5000/MakeShapModel/GetShapByErrors",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        console.log(response.data);
        this.images = response.data.data;
        app_data.shap_by_errors = response.data.data;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clearImages() {
      app_data.shap_by_errors = undefined;
      this.images = [];
    },
  },
  mounted() {
    if (app_data.shap_by_errors != undefined) {
      this.images = app_data.shap_by_errors;
    }
  },
};
</script>

<style scoped>
</style>
