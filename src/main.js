import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import 'vuesax/dist/vuesax.css';


import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  SpinnerPlugin,
  FormRadioPlugin,
  ListGroupPlugin,
  FormFilePlugin,
  SidebarPlugin
 
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  SpinnerPlugin,
  FormRadioPlugin,
  ListGroupPlugin,
  FormFilePlugin,
  SidebarPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;

  },
  async logout() {
    app.logout();

    localStorage.removeItem("username");
    localStorage.removeItem("lastSearch");
    this.username = undefined;
    // app_data.lastSearch=[];
    app_data.recipes = undefined;
    app_data.lastWatch = undefined;
    app_data.myFavorite = undefined;
    app_data.myFamily = undefined;
    Vue.$cookies.remove("session");

  },
};
import { app_data } from "./assets/app_data";
Vue.prototype.$store = app_data;

var app = new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
    async logout() {
      try {
        const response = await this.axios.post(
          // "https://assignment3-2-shiran-hen.herokuapp.com/guest/login",
          "http://localhost:3000/user/logout"
        );
      } catch (err) {}
    },
  },
  created(){
    window.document.title = 'Happy Recipes'; 
  },

  render: (h) => h(App),
}).$mount("#app");
