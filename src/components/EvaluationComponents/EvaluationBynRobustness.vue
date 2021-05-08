<template>
  <div class="container">
    <div>
      <b-card title="Robustness" sub-title="">
        <b-card-text>
          <b-card-text>
            In terms of machine learning, a model is considered more robust than
            another if it suffers less from the impact of noise.
          </b-card-text>
          <b-form
            @submit.prevent="onSubmit"
            @reset.prevent="onReset"
            v-show="!submit_form && second_form == 0 && !show_images"
          >
            <h2>Choose a dataset</h2>

            <b-col sm="5">
              <b-form-file
                size="sm"
                accept=".csv"
                enctype="multipart/form-data"
                v-model="form.dataset"
                :state="validateState('dataset')"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <b-form-invalid-feedback v-if="!$v.form.dataset.required"
                >Dataset is required</b-form-invalid-feedback
              >
            </b-col>
            <br />
            <h2>Choose a trained machine learning model</h2>

            <b-col sm="5">
              <b-form-file
                size="sm"
                accept=".pkl"
                v-model="form.predict_model"
                :state="validateState('predict_model')"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <b-form-invalid-feedback v-if="!$v.form.predict_model.required"
                >Predict model is required</b-form-invalid-feedback
              >
            </b-col>
            <br />
            <b-button
              type="reset"
              style="width: 90px; margin-left: 65px"
              variant="danger"
              >Reset</b-button
            >
            <b-button
              type="submit"
              variant="primary"
              style="width: 90px; margin-left: 15px"
              class="ml-5 w-10"
              >Next</b-button
            >
          </b-form>
          <div v-show="submit_form && !show_images">
            <b-form>
              <h2>please choose your features that you pretrained about</h2>
              <input type="checkbox" @change="selectAll" />
              <label for="vehicle3"> Select all</label><br /><br />
              <label v-for="f in features_list" :key="f">
                <input
                  type="checkbox"
                  :id="f"
                  :value="f"
                  v-model="checkedFeatures"
                />{{ f }}
              </label>
              <br />
              <span
                >Checked features:
                <li v-for="l in checkedFeatures" :key="l">{{ l }}</li>
                {{ l }}</span
              >
              <br />
              <br />
              <h2>Choose the ‘label’ feature:</h2>
              <select v-model="features_form.selected_target">
                <option v-for="f in features_list" :key="f" required>
                  {{ f }}
                </option>
              </select>
              <b-form-invalid-feedback v-if="$v.features_form.features == 0"
                >you have to choose features</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                v-if="!$v.features_form.selected_target.required"
                >please select a feature target</b-form-invalid-feedback
              >
            </b-form>
            <b-button
              variant="primary"
              style="width: 90px; margin-left: 65px; margin-top: 25px"
              class="ml-5 w-10"
              @click="nextToNoisyFeatures"
              >Next</b-button
            >
          </div>
          <div v-show="noisyFeature && !spinner && !show_images">
            <b-form>
              <h2>please choose your noisy features</h2>
              <label v-for="f in features_list" :key="f">
                <input
                  type="checkbox"
                  :id="f"
                  :value="f"
                  v-model="features_form.rob_features"
                />{{ f }}
              </label>
              <br />
              <span
                >Checked features:
                <li v-for="l in features_form.rob_features" :key="l">
                  {{ l }}
                </li></span
              >
              <br />
              <br />

              <b-form-invalid-feedback v-if="$v.features_form.features == 0"
                >you have to choose features</b-form-invalid-feedback
              >
            </b-form>
            <b-button
              variant="primary"
              style="width: 90px; margin-left: 65px"
              class="ml-5 w-10"
              @click="chooseNoisyFeatures"
              >Finish</b-button
            >
          </div>
          <div v-show="spinner && !show_images">
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
            <h5>it may take a few minutes...</h5>
          </div>

          <div v-show="show_images">
            <div>
              <div></div>
              <b-card-group deck v-for="img in images" :key="img">
                <b-card :img-src="img" img-alt="Image" img-top> </b-card>
              </b-card-group>
            </div>
            <!-- <b-card-group deck v-for="img in images" :key="img">
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
                    <b-card-body title="Counterfactual graph">
                      <b-card-text>
                        In this graph two features have been changed.
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-group> -->
            <div style="text-align: center; padding: 20px">
              <b-button
                @click="clear()"
                style="width: 90px; margin-left: 65px"
                variant="primary"
                v-show="this.images.length > 0"
                >Clear</b-button
              >
            </div>
            <div style="text-align: center; padding: 20px">
              <b-button
                @click="tryAgain()"
                variant="primary"
                style="width: 150px; margin-left: 65px"
                v-show="this.images.length > 0"
                >Try another feature</b-button
              >
            </div>
          </div></b-card-text
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import app_data from "../../assets/app_data";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      images: [],
      spinner: false,
      form: {
        dataset: null,
        predict_model: null,
        features_list: [],
        feature_target: "",
        submitError: undefined,
      },
      features_form: {
        features: [],
        selected_target: "",
        rob_features: [],
      },
      allSelected: false,
      indeterminate: false,
      submit_form: false,
      checkedFeatures: [],
      size_features: 0,
      noisyFeature: false,
      second_form: 0,
      show_images: false,
    };
  },

  methods: {
    tryAgain() {
      this.noisyFeature = true;
      this.submit_form = false;
      this.second_form = 1;
      this.show_images = false;
      this.images = [];
    },
    nextToNoisyFeatures() {
      this.noisyFeature = true;
      this.submit_form = false;
      this.second_form = 1;
    },
    chooseNoisyFeatures() {
      this.$v.features_form.$touch();
      if (this.$v.features_form.$anyError) {
        return;
      }
      // this.$root.store.setData(
      //   this.form.dataset,
      //   this.form.predict_model,
      //   this.checkedFeatures,
      //   this.features_form.selected_target,
      // );
      app_data.evaluation_by_robustness_data = this.form.dataset;
      app_data.evaluation_by_robustness_model = this.form.predict_model;
      app_data.evaluation_by_robustness_features = this.checkedFeatures;
      app_data.evaluation_by_robustness_label = this.features_form.selected_target;
      app_data.evaluation_by_robustness_rob_features = this.features_form.rob_features;

      this.lime_or_shap = true;
      this.getEvaluationByRobustness();
    },
    onReset() {
      this.form = {
        dataset: null,
        predict_model: null,
      };
      this.$refs.fileinput.reset();

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.getFeatures();
    },
    async getFeatures() {
      try {
        var formData = new FormData();
        formData.append("data", this.form.dataset);
        formData.append("model", this.form.predict_model);
        const response = await this.axios.post(
          "http://localhost:5000/submitDatasetModel",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        let features_list = response.data.split(",");

        this.features_list = features_list;
        this.size_features = this.features_list.length;
        this.submit_form = true;
        this.second_form = 1;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    selectAll() {
      if (this.checkedFeatures.length != this.size_features) {
        this.checkedFeatures = this.features_list;
      } else if (this.checkedFeatures.length == this.size_features) {
        this.checkedFeatures = [];
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async getEvaluationByRobustness() {
      this.images = [];
      this.spinner = true;
      try {
        var formData = new FormData();
        formData.append("data", app_data.evaluation_by_robustness_data);
        formData.append("model", app_data.evaluation_by_robustness_model);
        formData.append("features", app_data.evaluation_by_robustness_features);
        formData.append(
          "rob_features",
          app_data.evaluation_by_robustness_rob_features
        );
        const response = await this.axios.post(
          "http://localhost:5000/ShapEvaluation/GetShapEvaluationByRob",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.spinner = false;
        this.images = response.data.data;
        app_data.evaluation_by_robustness_images = this.images;
        this.noisyFeature = false;
        this.show_images = true;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    clear() {
      this.show_images = false;
      this.images = [];
      this.checkedFeatures = [];
      this.features_form.rob_features = [];
      app_data.evaluation_by_robustness_images = undefined;
      app_data.evaluation_by_robustness_data = undefined;
      app_data.evaluation_by_robustness_model = undefined;
      app_data.evaluation_by_robustness_label = undefined;
      app_data.evaluation_by_robustness_rob_features = undefined;
      app_data.evaluation_by_robustness_data = undefined;
      this.submit_form = false;
      this.second_form = 0;
    },
  },
  validations: {
    form: {
      dataset: {
        required,
      },
      predict_model: {
        required,
      },
    },
    features_form: {
      selected_target: required,
    },
  },
  mounted() {
    console.log(app_data.evaluation_by_robustness_images);
    if (app_data.evaluation_by_robustness_images != undefined) {
      this.images = app_data.evaluation_by_robustness_images;
      this.show_images = true;
    }
    // this.images = app_data.evaluation_by_robustness_images;
    // if(this.images.length>0){
    //   this.noisyFeature =false;
    //   this.submit_form=false;
    // }
  },
};
</script>

<style scoped>
input {
  width: 70px;
  padding: 5px;
}
#close-image,
#close-CSS {
  display: inline-block;
  height: 134px;
  padding: 0;
  margin: 0;
  vertical-align: top;
  width: 104px;
}

#close-image img {
  display: block;
  height: 130px;
  width: 100px;
}

#close-CSS {
  background-image: url("https://user-images.githubusercontent.com/38404461/65588818-7734b500-df88-11e9-907c-a0bc0c0fdfc1.png");
  background-size: 100px 130px;
  height: 134px;
  width: 104px;
}
</style>
