<template>
  <div class="container">
    <h1>Explanation to be added</h1>

    <b-button
      @click="getevaluateByClustering"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    };
  },

  methods: {
    // async getShapByErrors() {
    //   // let info = await this.axios.get(
    //   //   "http://localhost:8080/shap/GetShapByErrors/"
    //   // );
    //   // errors_plot = [];
    //   // info.data.forEach((element) => {
    //   //   errors_plot.push(element);
    //   // });
    //   this.images= ["https://picsum.photos/400/400/?image=20","https://picsum.photos/400/400/?image=20","https://picsum.photos/400/400/?image=20"]
    //   console.log(this.images)
    // },
  },
};
</script>

<style scoped>
</style>
