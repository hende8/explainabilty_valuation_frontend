<template>
  <div>
    <DatasetModelForm class="datasetModelForm" />
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

import DatasetModelForm from "../components/DatasetModelForm";

export default {
  components: {
    DatasetModelForm,
  },
  data() {
    return {
      step: 1,
      total_steps: 4,
      form: {
        dataset: null,
        model: null,
        features: null,
        explain_model: null,
      },
    };
  },
  validations: {
    form: {
      dataset: {
        required,
      },
      model: {
        required,
      },
      explain_model: {
        required,
      },
      features: {
        required,
      },
    },
  },

  mounted() {},
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    nextStep: function () {
      this.step++;
    },
    previousStep: function () {
      this.step--;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.processCSV(files[0]);
    },
    processCSV(file) {
      //pass file to bacend
    },
    async uploadCSV() {
      try {
        const response = await this.axios.post(
          // "https://assignment3-2-shiran-hen.herokuapp.com/guest/login",
          "http://localhost:3000/guest/login",

          {
            username: this.form.username,
            password: this.form.password,
          }
        );
        this.$root.store.login(this.form.username);
        this.$root.$emit("loginUserNavBar", this.form.username);
        this.$emit("login");
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    // onSubmit(event) {
    //   event.preventDefault()
    //   alert(JSON.stringify(this.form))
    // },
    // onReset(event) {
    //   event.preventDefault()
    //   // Reset our form values
    //   this.form.email = ''
    //   this.form.name = ''
    //   this.form.food = null
    //   this.form.checked = []
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false
    //   this.$nextTick(() => {
    //     this.show = true
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
.Recipes {
  max-width: 100%;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
