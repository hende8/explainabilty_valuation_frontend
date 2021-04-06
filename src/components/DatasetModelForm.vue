<template>
  <div class="container">
    <div style="width: 1200px; position: absolute" v-if="!lime_or_shap">
      <h1>Evaluation and Explanation system</h1>
      <h5>
        The first step before using the framework is uploading two files:
        <ul>
          <li>
            A dataset (that contains only the features you used for training the
            model)
          </li>
          <li>
           A trained machine learning model.
          </li>
        </ul>
      </h5>
      <h5>
        Before you are using our system, we would like to ask you to get in
        advance a dataset and the predict model that pretrained on it.
      </h5>
      <h5>
        <b>Note:</b> Currently the framework supports tree based machine
        learning models.
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
          <h2>Choose a trained machine learning model</h2>

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

      <div v-show="submit_form">
        <b-form>
          <h2>please choose your features that you pretrained about</h2>
          <input type="checkbox" @change="selectAll" />
          <label for="vehicle3"> selectAll</label><br /><br />
          <label v-for="f in features_list" :key="f">
            <input
              type="checkbox"
              :id="f"
              :value="f"
              v-model="checkedFeatures"
            />{{ f }}
          </label>
          <br />
          <span>Checked features: {{ checkedFeatures }}</span>
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
      <div
        style="
          margin: 10;
          position: absolute;
          top: 50%;
          left: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        "
      >
        <ParticleEffectButton
          :visible.sync="btnOps.visible"
          :animating.sync="btnOps.animating"
          :options="btnOps"
          cls="btn-cls"
          v-on:click.native="shapChosen"
          style="margin: 10px"
        >
          Explanation
        </ParticleEffectButton>
        <ParticleEffectButton
          :visible.sync="btnOps.visible"
          :animating.sync="btnOps.animating"
          :options="btnOps"
          cls="btn-cls"
          v-on:click.native="limeChosen"
          style="margin: 10px"
        >
          Evaluation
        </ParticleEffectButton>
      </div>
    </div>
  </div>
</template>

<script>
import ParticleEffectButton from "vue-particle-effect-buttons";

import app_data from "../assets/app_data";
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
        features_list: [],
        feature_target: "",
        submitError: undefined,
      },
      features_form: {
        features: [],
        selected_target: "",
      },
      allSelected: false,
      indeterminate: false,
      submit_form: false,
      checkedFeatures: [],
      size_features: 0,
      lime_or_shap: false,
      image: null,
      btnOps: {
        type: "triangle",
        easing: "easeOutQuart",
        size: 6,
        particlesAmountCoefficient: 4,
        oscillationCoefficient: 2,
        color: function () {
          return Math.random() < 0.5 ? "#333333" : "#333333";
        },
        visible: true,
        animating: false,
      },
      // visible: true,
      // animating: false,
    };
  },
  components: {
    ParticleEffectButton,
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
    selectAll() {
      if (this.checkedFeatures.length != this.size_features) {
        this.checkedFeatures = this.features_list;
      } else if (this.checkedFeatures.length == this.size_features) {
        this.checkedFeatures = [];
      }
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
      app_data.model_predict = this.form.predict_model;
      app_data.data = this.form.dataset;
      app_data.features = this.checkedFeatures;
      app_data.target = this.features_form.selected_target;
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
        this.size_features = this.features_list.length;
        this.submit_form = true;
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    async shapChosen() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$router.push("/shap");
    },
    async limeChosen() {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.$router.push("/evaluation");
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
