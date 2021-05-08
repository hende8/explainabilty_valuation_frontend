<template>
  <div>
    <b-container>
      <section class="text-center my-5">
        <h2>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Lime_%28transportation_company%29_logo.svg"
            style="width: 300px; height: 120px"
            alt=""
          />
        </h2>
        <p>Lets explore our data using Lime explaination model</p>
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
          <b-nav-item @click="swapComponents('Lime by errors')"
            >Lime by errors</b-nav-item
          >
        </b-nav>

        <b-card-body v-if="current_component == 'introduction'">
          <div>
            <b-card title="Local Surrogate (LIME)" sub-title="">
              <b-card-text>
                Local surrogate models are interpretable models that are used to
                explain individual predictions of black box machine learning
                models. Local interpretable model-agnostic explanations (LIME)
                is a paper in which the authors propose a concrete
                implementation of local surrogate models.
              </b-card-text>

              <b-card-text>
                Surrogate models are trained to approximate the predictions of
                the underlying black box model. Instead of training a global
                surrogate model, LIME focuses on training local surrogate models
                to explain individual predictions.</b-card-text
              >
            </b-card>
            <div>
              <b-card-group deck>
                <b-card
                  title="Full data"
                  :img-src="require('../assets/full_data_lime.png')"
                  img-alt="Image"
                  img-top
                >
                </b-card>
                <b-card
                  title="Single instance"
                  :img-src="require('../assets/lime_single_instnace.png')"
                  img-alt="Image"
                  img-top
                >
                </b-card>
                <b-card
                  title="Lime by errors"
                  :img-src="require('../assets/false negative lime.png')"
                  img-alt="Image"
                  img-top
                >
                </b-card>
              </b-card-group>
            </div>
          </div>
        </b-card-body>
        <b-card-body v-if="current_component == 'Single instance'">
          <ExplainSingleInstnace
            class="SHAPSingleInstnace"
            :features="features"
            explanation_model="Lime"
          />
        </b-card-body>
        <b-card-body v-if="current_component == 'Full data'">
          <ExplainFullData class="SHAPFullData" explanation_model="Lime" />
        </b-card-body>
        <b-card-body v-if="current_component == 'Lime by errors'">
          <ExplainByErrors class="SHAPByErrors" explanation_model="Lime" />
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