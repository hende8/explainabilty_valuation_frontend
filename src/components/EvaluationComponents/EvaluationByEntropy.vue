<template>
  <div class="container">
    <div>
      <b-card title="Evaluation By Entropy" sub-title="">
        <b-card-text>
          This is page for showing the evauation for explaination
          method</b-card-text
        >
        <b-button
          @click="getEvaluationByEntropy()"
          variant="primary"
          style="width: 90px"
          class="ml-5 w-10"
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
        <div v-if="this.titles">
          <b-card-group
            deck
            v-for="(img,index) in images"
            :key="img"
            
          >
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
                  <b-card-body :title="this.titles[index]">
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
      </b-card>
      <div style="text-align: center; padding: 20px">
        <b-button
          @click="clear()"
          variant="primary"
          style="width: 90px"
          class="ml-5 w-10"
          v-show="this.images.length > 0"
          >Clear</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import app_data from "../../assets/app_data";
export default {
  data() {
    return {
      images: [],
      titles: [],
      text: [],
      spinner: false,
    };
  },

  methods: {
    async getEvaluationByEntropy() {
      console.log("entropy");
      this.images = [];
      this.spinner = true;
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
        this.spinner = false;
        app_data.evaluation_by_entropy = this.images;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clear() {
      this.images = [];
      app_data.evaluation_by_entropy = [];
    },
  },
  mounted(){
    this.images=app_data.evaluation_by_entropy
  }
};
</script>

<style scoped></style>
