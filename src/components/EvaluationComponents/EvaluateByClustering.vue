<template>
  <div class="container">
    <h4>This is page for showing the evauation for explaination method</h4>

      <label for="sb-inline">Choose number of clusters:</label>
      <b-form-spinbutton id="sb-inline" v-model="cluster_value" inline></b-form-spinbutton>

    <b-button
      @click="getEvaluationByClustering()"
      variant="primary"
      style="width: 90px"
      class="ml-5 w-10"
      >Get graphs</b-button>
    <div>
      <b-card-group  deck v-for="img in images" :key="img">
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
                  {{info_message}}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      cluster_value: 11,
      images: [],
      info_message: "",
    };
  },

  methods: {
    async getEvaluationByClustering() {
      this.images=[]
      try {
        var formData = new FormData();
        formData.append("data",this.$root.store.data)
        formData.append("model",this.$root.store.model)
        let f = "gender,age_group,symptom_well,symptom_sore_throat,symptom_cough,symptom_shortness_of_breath,symptom_smell_or_taste_loss,symptom_fever,condition_any";
        formData.append("features",f)
        formData.append("label","label")
        formData.append("clustersNum", this.cluster_value)
        const response = await this.axios.post(
          'http://localhost:5000/ShapEvaluation/GetShapEvaluationByClusters',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          
          
          });

        console.log(response.data)
        this.images= response.data.data
        console.log(this.images)
        this.info_message = response.data.info_message

      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },

  }
}
</script>

<style scoped>
</style>
