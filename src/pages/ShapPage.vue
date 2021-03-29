<template>
  <div>
    <b-container>
      <section class="text-center my-5">
        <h2>
          <b>{{title}}</b>
        </h2>
        <p>Lets explore our data using SHAP explaination model</p>
      </section>
      <div>
        <b-nav tabs fill>
          <b-nav-item @click="swapComponents('introduction')"
            >Introduction</b-nav-item
          >
          <b-nav-item @click="swapComponents('Single instance')"
            >Single instance</b-nav-item
          >
          <b-nav-item @click="swapComponents('Full data')"
            >Full data
          </b-nav-item>
          <b-nav-item @click="swapComponents('SHAP by errors')"
            >SHAP by errors</b-nav-item
          >
        </b-nav>

        <b-card-body v-if="current_component == 'introduction'">
          <h1>introduction</h1>
        </b-card-body>
        <b-card-body v-if="current_component == 'Single instance'">
          <h1>Single instance</h1>
          <ExplainSingleInstnace class="SHAPSingleInstnace" :features="features" />
        </b-card-body>
        <b-card-body v-if="current_component == 'Full data'">
          <h1>Full data</h1>
          <ExplainFullData class="SHAPFullData" />
        </b-card-body>
        <b-card-body v-if="current_component == 'SHAP by errors'">
          <h1>SHAP by errors</h1>
          <ExplainByErrors class="SHAPByErrors" />
        </b-card-body>
      </div>
    </b-container>

  </div>
</template>

<script>
import ExplainByErrors from "../components/ExplainComponents/ExplainByErrors.vue";
import ExplainFullData from "../components/ExplainComponents/ExplainFullData.vue";
import ExplainSingleInstnace from "../components/ExplainComponents/ExplainSingleInstnace.vue";
export default {
  components: {  ExplainByErrors, ExplainFullData, ExplainSingleInstnace },
  props:{
    title:{
      type:String,
      require:true
    }
  },
  data() {
    return {
      current_component: "introduction",
      // data:  this.$root.store.data,
      // model:  this.$root.store.model,
      features: ["gender","age_group","symptom_well","symptom_sore_throat","symptom_cough","symptom_shortness_of_breath","symptom_smell_or_taste_loss","symptom_fever","condition_any"],
      title2:this.title
    };
  },
  methods: {
    swapComponents(componenet_name) {
      this.current_component = componenet_name;
    },
  },
  created(){
    console.log(this.title)    
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: block;
}
.images {
  margin-right: 20px;
  display: inline-block;
}
</style>