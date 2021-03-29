<template>
  <div class="container">
    <h2>
      In this section you are able to explain your predicticting result.<br />
      Please fill the missing values and get explain for your results
    </h2>
    <b-button @click="showFeatures" variant="primary">Exolore explanations</b-button>
    <div v-show="showFeaturesBool">
      <b-form
        v-for="f in this.features"
        :key="f"
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
      >
        <b-col sm="3">
          <b-form-group id="input-group-1" :label="f" label-for="input-1">
            <b-form-input id="input-1" 
            v-model="form[f]"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form>
      <b-button @click="onReset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
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
      form: form_create,
      showFeaturesBool:false
    };
  },
  props: {
    features: Array,
  },

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

      this.$root.store.setData(this.form.dataset, this.form.predict_model);
      this.test();
    },
    showFeatures(){
      this.showFeaturesBool=true
      
      },
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
