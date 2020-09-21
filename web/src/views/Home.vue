<template>
  <div class="home" :style="{ backgroundImage: bg }">
    <div class="content">
      <Guide />
      <div class="title">落落的个人博客</div>
      <div class="tips">博客建设中</div>
      <router-link class="link" :to="{ path: '/gobang' }"
        >点击这里下五子棋,适合手机上玩</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const bg1 = require("@/assets/bg1.jpg");
const bg2 = require("@/assets/bg2.jpg");
const bg3 = require("@/assets/bg3.jpg");
const bg4 = require("@/assets/bg4.jpg");
import Guide from "@/views/layer/guide.vue";

@Component({
  components: {
    Guide
  }
})
export default class Home extends Vue {
  bgList: Array<string> = [
    "url(" + bg1 + ")",
    "url(" + bg2 + ")",
    "url(" + bg3 + ")",
    "url(" + bg4 + ")"
  ];
  bg: String = "";
  created() {
    let index = Math.floor(Math.random() * 4);
    this.bg = this.bgList[index];
  }
  mounted() {}
  onmounted() {}
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #fefefe;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 6rem;
    height: 3rem;
    max-width: 80%;
    max-height: 60%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0.02rem 0.08rem rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    .title {
      font-size: 0.3rem;
      color: #333;
      font-weight: bold;
      line-height: 2;
      margin-bottom: 0.2rem;
    }
    .tips {
      font-size: 0.14rem;
      color: #666;
      line-height: 1.5;
    }
    .link {
      font-size: 0.14rem;
      line-height: 1.5;
    }
  }
}
</style>
