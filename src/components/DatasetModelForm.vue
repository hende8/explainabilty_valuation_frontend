<template>
  <div class="container">
    <div style="width: 1200px; position: absolute" v-if="!lime_or_shap">
      <h1>Evaluation and Explanation system</h1>
      <h5>
        In this system you will get an explanation and avaluation about those
        explains.
      </h5>
      <h5>
        Before you are using our system, we would like to ask you to get in
        advance a dataset and the predict model that pretrained on it.
      </h5>
      <h5>
        <b>Note:</b> The dataset must include the exact features that you have
        trained in your predict model.
      </h5>
      <br />
      <br />

      <!-- Styled -->
      <b-form
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
        v-show="!submit_form"
      >
        <b-col sm="5">
          <h2>Choose a dataset</h2>

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
        <b-col sm="5">
          <h2>Choose a predict model</h2>

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
        <b-button type="reset" style="width: 90px" variant="danger"
          >Reset</b-button
        >
        <b-button
          type="submit"
          variant="primary"
          style="width: 90px"
          class="ml-5 w-10"
          >Next</b-button
        >
      </b-form>

      <div v-show="submit_form">
        <b-form>
          <h2>please choose your features that you pretrained about</h2>
          <label v-for="f in features_list" :key="f">
            <b-row>
              <input
                type="checkbox"
                :id="f"
                :value="f"
                v-model="checkedFeatures"
              />{{ f }}
            </b-row>
          </label>
          <br />
          <span>Checked features: {{ checkedFeatures }}</span>
          <br />
          <br />
          <h2>choose your target prediction model:</h2>
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
          style="width: 90px"
          class="ml-5 w-10"
          @click="finish_fill_deatils"
          >Finish</b-button
        >
      </div>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
        >Process failed: {{ form.submitError }}</b-alert
      >
    </div>
    <div v-if="lime_or_shap">
      <b-button @click="shapChosen" style="width: 150px" variant="danger"
        >SHAP</b-button
      >
      <b-button
        @click="limeChosen"
        variant="primary"
        style="width: 150px"
        class="ml-5 w-10"
        >lime</b-button
      >
    </div>
  </div>
</template>

<script>
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
      form: {
        dataset: null,
        predict_model: null,
        features_list: null,
        feature_target: "",
        submitError: undefined,
      },
      features_form: {
        features: [],
        selected_target: "",
      },
      submit_form: false,
      checkedFeatures: [],
      lime_or_shap: false,
      image: null,
    };
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
  methods: {
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
      this.submitDatasetModel();
    },
    finish_fill_deatils() {
      this.$v.features_form.$touch();
      if (this.$v.features_form.$anyError) {
        return;
      }
      this.$root.store.setData(
        this.form.dataset,
        this.form.predict_model,
        this.checkedFeatures,
        this.features_form.selected_target
      );
      this.lime_or_shap = true;
    },
    async submitDatasetModel() {
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
        this.submit_form = true;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    shapChosen() {
      this.$router.push("/shap");
    },
    limeChosen() {
      this.$router.push("/lime");
    },

    async createExplanationValuation() {
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
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style scoped>
input {
  width: 70px;
  padding: 5px;
}
</style>
