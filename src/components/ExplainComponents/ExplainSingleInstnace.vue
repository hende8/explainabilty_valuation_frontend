<template>
  <div class="container">
    <div>
      <div>
        <b-card
          title="Explanation for a single record’s prediction
"
          sub-title=""
        >
          <b-card-text>
            In this screen you may insert your own record’s values. The system
            will calculate the prediction and explain it using an explanation
            method. <br />
          </b-card-text>

          <b-button
            v-show="
              this.image == undefined && !this.spinner && !showFeaturesBool
            "
            @click="showFeatures"
            variant="primary"
            >Explain an instance</b-button
          >
          <div
            v-show="
              showFeaturesBool && this.image == undefined && !this.spinner
            "
          >
            <div v-if="showFeaturesBool">
              Please fill the missing values and get explain for your prediction
              result.
            </div>
            <b-form
              v-for="f in this.features"
              :key="f"
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
            >
              <b-col sm="4">
                <b>
                  <b-form-group
                    id="input-group-1"
                    :label="f"
                    label-for="input-1"
                  >
                    <b-form-input id="input-1" v-model="form[f]"></b-form-input>
                  </b-form-group>
                </b>
              </b-col>
            </b-form>
            <b-button
              @click="onReset"
              variant="danger"
              style="margin-left: 50px; margin-right: 15px"
              >Reset</b-button
            >
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
                    <b-card-body title="">
                      <b-card-text>
                        The above explanation shows features each contributing
                        to push the model output from the base value (the
                        average model output over the training dataset we
                        passed) to the model output. Features pushing the
                        prediction higher are shown in red, those pushing the
                        prediction lower are in blue.
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-group>
            <br />
            <div style="text-align: center; padding: 20px">
              <b-button @click="tryAgain" type="submit" variant="primary"
                >Try again</b-button
              >
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import app_data from "../../assets/app_data";
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
    explanation_model: String,
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
        formData.append("data_origin", app_data.data);
        formData.append("model", this.$root.store.model);
        formData.append("features", this.$root.store.features);
        var path = "";
        if (this.explanation_model == "SHAP") {
          path = "http://localhost:5000/MakeShapModel/GetInstanceShap";
        } else {
          path = "http://localhost:5000/MakeLimeModel/GetInstanceLime";
        }
        const response = await this.axios.post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.spinner = false;
        this.image = response.data;
        if (this.explanation_model == "SHAP") {
          app_data.shap_single_instance = this.image;
        } else {
          app_data.lime_single_instance = this.image;
        }
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    tryAgain() {
      this.onReset();
      if (this.explanation_model == "SHAP") {
      app_data.shap_single_instance = undefined;
      } else {
      app_data.lime_single_instance = undefined;
      }
      this.image = undefined;
    },
  },
  mounted() {
    if (this.explanation_model == "SHAP") {
      this.image = app_data.shap_single_instance;
    } else {
      this.image = app_data.lime_single_instance;
    }
  },
};
</script>

<style scoped>
</style>
