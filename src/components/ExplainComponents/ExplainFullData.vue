<template>
  <div class="container">
  <h1>TEST </h1>
  <button v-on:click="test()" > click</button>
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
          "http://localhost:5000/MakeShapModel/GetAllDataShap", // to fix it
          {
            data: this.$root.store.data,
            model: this.$root.store.model,
            features:[gender,age_group,symptom_well,symptom_sore_throat,symptom_cough,symptom_shortness_of_breath,symptom_smell_or_taste_loss,symptom_fever,condition_any]
          }
        );
        // if (response.status == "201") {
        //   this.$router.push("/evaluation");
        // }

        console.log(response)
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },

  },
};
</script>

<style scoped>
</style>
