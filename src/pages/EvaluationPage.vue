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
          <b-nav-item @click="swapComponents('Introduction')">
            Introduction
          </b-nav-item>
          <b-nav-item @click="swapComponents('EvaluateByClustering')"
            >Consistency</b-nav-item
          >
          <b-nav-item @click="swapComponents('EvaluationByEntropy')"
            >Entropy</b-nav-item
          >
          <b-nav-item @click="swapComponents('EvaluationByCounterfactual')"
            >Faithfulness
          </b-nav-item>
          <b-nav-item @click="swapComponents('EvaluationBynRobustness')"
            >Robustness
          </b-nav-item>
        </b-nav>
        <b-card-body v-if="current_component == 'Introduction'">
          <div>
            <b-card title="Evaluation to XAI models" sub-title="">
              <b-card-text> </b-card-text>

              <b-card-text>
                Evaluating the explanation's quality is important for realizing
                the true benefits for end-users in practical settings. In this
                framework we provide evaluations of the explanation methods by
                comparing between them. You can see different evaluation
                metrics: Consistency, Faithfulness (also called fidelity) and
                robustness.
                <br />
                <br />
                <!-- On this website, we implement evaluation of explanations. Our
                key observation is to provide ground truth for evaluating
                whether the regions identified by an XAI method are truly
                relevant to its output.
                <br />
                In the features in front of you, we implement metrics for
                systematic evaluation of explanations that an XAI method
                generates and evaluate. -->
              </b-card-text>
              <div>
                <b-card-group deck>
                  <b-card
                    title="Evaluation by Consistency"
                    :img-src="require('../assets/clustering1.png')"
                    img-alt="Image"
                    img-top
                    img-height="180"
                  >
                  </b-card>
                  <b-card
                    title="Evaluation by Entropy"
                    :img-src="require('../assets/shap_vs_lime.png')"
                    img-alt="Image"
                    img-top
                    img-height="180"
                  >
                  </b-card>

                  <b-card
                    title="Evaluation by Faithfullness"
                    :img-src="require('../assets/counterfac.png')"
                    img-alt="Image"
                    img-top
                    img-height="180"
                  >
                  </b-card>
                  <b-card
                    title="Evaluation by Robustness"
                    :img-src="require('../assets/robustness_example.png')"
                    img-alt="Image"
                    img-top
                    img-height="175"
                  >
                  </b-card>
                </b-card-group>
              </div>
            </b-card>
          </div>
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluateByClustering'">
          <EvaluateByClustering class="SHAPSingleInstnace" />
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluationByEntropy'">
          <EvaluationByEntropy class="SHAPSingleInstnace" />
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluationByCounterfactual'">
          <EvaluationByCounterfactual class="SHAPFullData" />
        </b-card-body>
        <b-card-body v-if="current_component == 'EvaluationBynRobustness'">
          <EvaluationBynRobustness class="SHAPFullData" />
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
import EvaluationBynRobustness from "../components/EvaluationComponents/EvaluationBynRobustness.vue";
export default {
  components: {
    EvaluationByEntropy,
    EvaluationByCounterfactual,
    EvaluateByClustering,
    EvaluationBynRobustness,
  },
  data() {
    return {
      SideBar,
      current_component: "Introduction",
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