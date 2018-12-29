<template>
  <div class="test-vue">
    <div class="header">{{text}}</div>
    <div class="content">123</div>
    <test></test>
    <div class="image-box">
      <img :src="imageUrl" alt="bg">
    </div>
  </div>
</template>

<script>
import test from "./test";
export default {
  name: "testVue",
  components: {
    test
  },
  data() {
    return {
      text: process.env.NODE_ENV + "123",
      imageUrl: require("@/assets/images/1.png"),
      list: [
        {
          id: 0,
          title: "测试111"
        }
      ]
    };
  },
  methods: {
    testFun(str = "999") {
      console.log(str);
    }
  },
  created() {
    this.testFun();
  }
};
</script>

<style lang="less" scoped>
@import "./test";
.test-vue {
  color: green;
  .content {
    transform: scale(0.8);
    font-size: 40px;
  }
}
</style>



