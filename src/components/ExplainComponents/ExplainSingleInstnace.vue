<template>
  <div class="container">
    <div>
      <div>
        <b-card title="Explain single instance" sub-title="">
          <b-card-text>
            In this section you are able to explain your predicticting
            result.<br />
            Please fill the missing values and get explain for your results
          </b-card-text>

          <b-card-text> to be CONTINUE </b-card-text>
          <b-button
            v-show="
              this.image == undefined && !this.spinner && !showFeaturesBool
            "
            @click="showFeatures"
            variant="primary"
            >Explore explanations</b-button
          >
          <div
            v-show="
              showFeaturesBool && this.image == undefined && !this.spinner
            "
          >
            <b-form
              v-for="f in this.features"
              :key="f"
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
            >
              <b-col sm="3">
                <b-form-group id="input-group-1" :label="f" label-for="input-1">
                  <b-form-input id="input-1" v-model="form[f]"></b-form-input>
                  <!-- <b-form-invalid-feedback v-if="!$v.form.f.required"
              >{{f}} is required</b-form-invalid-feedback
            > -->
                </b-form-group>
              </b-col>
            </b-form>
            <b-button @click="onReset" variant="danger">Reset</b-button>
            <b-button
              @click="getShapExplanation"
              type="submit"
              variant="primary"
              >Submit</b-button
            >
          </div>
          <div v-show="spinner">
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
            <h3>its may take a few minutes...</h3>
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
            <br />
            <b-button @click="tryAgain" type="submit" variant="primary"
              >Try again</b-button
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let form_create = this.features.reduce((acc, elem) => {
      acc[elem] = null; // or what ever object you want inside
      return acc;
    }, {});
    return {
      image: undefined,
      form: form_create,
      showFeaturesBool: false,
      spinner: false,
    };
  },
  props: {
    features: Array,
  },
  // validations: {
  // form: {
  //   dataset: {
  //     required,
  //   },
  //   predict_model: {
  //     required,
  //   },
  // },
  // },

  methods: {
    async test() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/evaluation", // to fix it
          {
            dataset: this.form.dataset,
            predict_model: this.form.predict_model,
          }
        );
        if (response.status == "201") {
          this.$router.push("/evaluation");
        }
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    onReset() {
      let clear_array = this.features.reduce((acc, elem) => {
        acc[elem] = null; // or what ever object you want inside
        return acc;
      }, {});
      this.form = clear_array;
      // this.$refs.fileinput.reset();

      // this.$nextTick(() => {
      //   this.$v.$reset();
      // });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.getShapExplanation();
    },
    showFeatures() {
      this.showFeaturesBool = true;
    },
    async getShapExplanation() {
      this.spinner = true;
      var temp_form = this.form;
      var df = this.features.reduce(function (res, item) {
        res[item] = temp_form[item]; // or what ever object you want inside
        return res;
      }, {});
      try {
        var formData = new FormData();
        formData.append("data", JSON.stringify(df));
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);

        const response = await this.axios.post(
          "http://localhost:5000/MakeShapModel/GetInstanceShap",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        this.image = response.data;
        console.log(this.image);
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    tryAgain() {
      this.onReset();
      this.image = undefined;
    },
  },
};
</script>

<style scoped>
</style>
