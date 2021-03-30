<template>
  <div class="container">
    <h2>
      In this section you are able to explain your predicticting result.<br />
      Please fill the missing values and get explain for your results
    </h2>
    <b-button @click="showFeatures" variant="primary"
      >Exolore explanations</b-button
    >
    <div v-show="showFeaturesBool">
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
      <b-button @click="getShapExplanation" type="submit" variant="primary"
        >Submit</b-button
      >
        <img  v-if="this.image != undefined" :src="this.image"   sclass="rounded" >
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
      image:undefined,
      form: form_create,
      showFeaturesBool: false,
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

        console.log(response);
        this.image = response.data;
        console.log(this.image)
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
</style>
