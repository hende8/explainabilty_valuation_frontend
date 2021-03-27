<template>
  <div class="container">
    <div style="width: 1200px; position: absolute">
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

      <!-- Styled -->
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-col sm="5">
          <h2>Choose a dataset</h2>

          <b-form-file
            size="sm"
            accept=".csv"
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
          >Finish</b-button
        >
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
        >Process failed: {{ form.submitError }}</b-alert
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
        submitError:undefined
      },
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
      this.createExplanationValuation();
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
</style>
