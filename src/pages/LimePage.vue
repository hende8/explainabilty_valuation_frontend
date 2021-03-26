<template>
  <div>
      <b-container>
      <section class="text-center my-5">
        <h2>
          <b>LIME</b>
        </h2>
        <p>
          Lets explore our data using Lime explaination model
          <br />
        </p>
      </section>
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
import SideBar from '../components/SideBar.vue';
import SidebarItem from '../components/SidebarItem.vue';
export default {
    components: { SidebarItem },
    data() {
    return {
    SideBar
    };
  },
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: block;
}
.images{
  margin-right: 20px;
  display:inline-block
}
</style>