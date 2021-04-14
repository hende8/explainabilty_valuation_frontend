<template>
  <div>
    <b-container>
      <section class="text-center my-5">
        <img
          src="https://user-images.githubusercontent.com/38404461/65588818-7734b500-df88-11e9-907c-a0bc0c0fdfc1.png"
          style="width: 300px; height: 120px"
          alt=""
        />
        <p>Lets explore our data using SHAP explaination model</p>
      </section>
      <div>
        <b-nav tabs fill >
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

        <b-card-body v-if="current_component == 'introduction'" >
          <div>
            <b-card title="SHAP (SHapley Additive exPlanations)" sub-title="" body-class="text-center" header-tag="nav">
              <b-card-text>
                SHAP (SHapley Additive exPlanations) by Lundberg and Lee (2016)
                is a method to explain individual predictions. SHAP is based on
                the game theoretically optimal Shapley Values.
                <em>card title</em> and make up the bulk of the card's content.
              </b-card-text>

              <b-card-text>
                The goal of SHAP is to explain the prediction of an instance x
                by computing the contribution of each feature to the prediction.
                The SHAP explanation method computes Shapley values from
                coalitional game theory. The feature values of a data instance
                act as players in a coalition. Shapley values tell us how to
                fairly distribute the "payout" (= the prediction) among the
                features.<br /><br />
                In the features in front of you, we visualize explanations that
                an XAI method generates and evaluate.
              </b-card-text>
              <div>
                <b-card-group deck>
                  <b-card
                    title="Single instance"
                    :img-src="require('../assets/single_instance.png')"
                    img-alt="Image"
                    img-top
                  >
                  </b-card>
                  <b-card
                    title="Full data"
                    :img-src="require('../assets/false negative.png')"
                    img-alt="Image"
                    img-top
                  >
                  </b-card>

                  <b-card
                    title="SHAP by errors"
                    :img-src="require('../assets/bar_plot_first_model.png')"
                    img-alt="Image"
                    img-top
                  >
                  </b-card>
                </b-card-group>
              </div>
            </b-card>
          </div>
        </b-card-body>
        <b-card-body v-if="current_component == 'Single instance'" >
          <ExplainSingleInstnace
            class="SHAPSingleInstnace"
            :features="features"
            explanation_model="SHAP"
          />
        </b-card-body>
        <b-card-body v-if="current_component == 'Full data'">
          <ExplainFullData class="SHAPFullData" explanation_model="SHAP"/>
        </b-card-body>
        <b-card-body v-if="current_component == 'SHAP by errors'">
          <ExplainByErrors class="SHAPByErrors" explanation_model="SHAP" />
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
  components: { ExplainByErrors, ExplainFullData, ExplainSingleInstnace },
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      current_component: "introduction",
      features: this.$root.store.features,
      title2: this.title,
    };
  },
  methods: {
    swapComponents(componenet_name) {
      this.current_component = componenet_name;
    },
  },
  mounted() {},
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