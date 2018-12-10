import Vue from "vue";
import testVue from "./src/testvue/index.vue";
import "./main.css";

new Vue({
  el: "#app",
  render: h => h(testVue)
});
