<template>
  <div class="container">
    <h2>You are more than walcome to use our tool.... TO BE CONTINUE</h2>
    <b-button
      v-show="this.image == undefined"
      @click="explainFullData()"
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
export default {
  data() {
    return {
      image: undefined,
    };
  },

  methods: {
    async explainFullData() {
      try {
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

        console.log(response);
        this.image = response.data;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clearImage(){
      this.image=undefined
    },
  },
};
</script>

<style scoped>
</style>
