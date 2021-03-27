<template>
  <div>
    <b-container>
      <section class="text-center my-5">
        <h2>
          <b>SHAP</b>
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
          <ExplainSingleInstnace class="SHAPSingleInstnace" />
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
import ExplainByErrors from "../components/ExplainComponents/ExplainByErrors.vue";
import ExplainFullData from "../components/ExplainComponents/ExplainFullData.vue";
import ExplainSingleInstnace from "../components/ExplainComponents/ExplainSingleInstnace.vue";
export default {
  components: {  ExplainByErrors, ExplainFullData, ExplainSingleInstnace },
  data() {
    return {
      SideBar,
      current_component: "introduction",
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