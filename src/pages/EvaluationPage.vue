<template>
  <div>
    <b-container>
      <section class="text-center my-5">
        <h2>
          <b>Evaluation Tool</b>
        </h2>
        <p>Lets evaluate our explaination method</p>
      </section>
      <div>
        <b-nav tabs fill>
          <b-nav-item @click="swapComponents('Introduction')"
            >Introduction</b-nav-item
          >
          <b-nav-item @click="swapComponents('EvaluateByClustering')"
            >Clustering Intersection</b-nav-item
          >
          <b-nav-item @click="swapComponents('EvaluationByEntropy')"
            >Evaluation By Entropy</b-nav-item
          >
          <b-nav-item @click="swapComponents('Counterfactual')"
            >Counterfactual
          </b-nav-item>
          >
        </b-nav>
        <b-card-body v-if="current_component == 'Introduction'">
          <h1>Introduction</h1>
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluateByClustering'">
          <h1>Evaluation By Clustering</h1>
          <EvaluateByClustering class="SHAPSingleInstnace" />
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluationByEntropy'">
          <h1>Evaluation By Entropy</h1>
          <EvaluationByEntropy class="SHAPSingleInstnace" />
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluationByCounterfactual'">
          <h1>Evaluation By Counterfactual</h1>
          <EvaluationByCounterfactual class="SHAPFullData" />
        </b-card-body>
      </div>
    </b-container>
    <b-container>
      <side-bar>
        <sidebar-item
          :link="{
            name: 'lime',
            path: '/lime',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'shap',
            path: '/shap',
          }"
        >
        </sidebar-item>
      </side-bar>
    </b-container>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import EvaluateByClustering from "../components/EvaluationComponents/EvaluateByClustering.vue";
import EvaluationByEntropy from "../components/EvaluationComponents/EvaluationByEntropy.vue";
import EvaluationByCounterfactual from "../components/EvaluationComponents/EvaluationByCounterfactual.vue";
export default {
  components: {
    EvaluationByEntropy,
    EvaluationByCounterfactual,
    EvaluateByClustering,
  },
  data() {
    return {
      SideBar,
      current_component: "EvaluateByClustering",
    };
  },
  methods: {
    swapComponents(componenet_name) {
      this.current_component = componenet_name;
    },
  },
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