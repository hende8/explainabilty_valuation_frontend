<template>
  <div class="container">
  <h1>TEST </h1>
  <button v-on:click="test()" > click</button>

  
  <img  v-if="this.image != undefined" :src="this.image"   sclass="rounded" >


  </div>
</template>

<script>

export default {
  data() {
    return {
      image:undefined
    };
  },
  
  methods: {
    async test() {
      try {
        var formData = new FormData();
        formData.append("data",this.$root.store.data)
        formData.append("model",this.$root.store.model)
        let f = "gender,age_group,symptom_well,symptom_sore_throat,symptom_cough,symptom_shortness_of_breath,symptom_smell_or_taste_loss,symptom_fever,condition_any";
        formData.append("features",f)
        const response = await this.axios.post(
          'http://localhost:5000/MakeShapModel/GetAllDataShap',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          
          
          });


        console.log(response)
        this.image= response.data

      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },

  },
};
</script>

<style scoped>
</style>
