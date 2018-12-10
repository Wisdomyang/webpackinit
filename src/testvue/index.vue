<template>
  <div class="test-vue">
    <div class="header">{{text}}</div>
    <div class="content">123</div>
    <test></test>
  </div>
</template>

<script>
import test from "./test.jsx";
export default {
  name: "testVue",
  components: {
    test
  },
  data() {
    return {
      text: process.env.NODE_ENV + "12"
    };
  }
};
</script>

<style lang="less" scoped>
.test-vue {
  color: green;
  .content {
    transform: scale(0.8);
    font-size: 40px;
  }
}
</style>



