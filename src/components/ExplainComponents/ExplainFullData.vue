<template>
  <div class="container">
  <h1>TEST </h1>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
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

  },
};
</script>

<style scoped>
</style>
