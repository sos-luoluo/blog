<template>
  <div class="auth">
    <div class="headportrait">
      <img :src="logoUrl" alt="" class="img" />
    </div>
    <div class="name">落落的个人博客</div>
    <div class="text">少年 愿你努力过后 成为自己梦里那样！</div>
    <div class="account_box">
      <div class="item">
        <a
          class="icon_box"
          href="https://space.bilibili.com/273745872"
          target="_blank"
        >
          <svg-icon :icon-class="'bilibili'"></svg-icon>
        </a>
      </div>
      <div class="item">
        <a
          class="icon_box"
          href="https://github.com/sos-luoluo"
          target="_blank"
        >
          <svg-icon :icon-class="'github'"></svg-icon>
        </a>
      </div>
      <div class="item">
        <div class="icon_box">
          <svg-icon :icon-class="'weixin'"></svg-icon>
        </div>
      </div>
      <div class="item">
        <a class="icon_box" href="mailto:re_an@qq.com">
          <svg-icon :icon-class="'email'"></svg-icon>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import SvgIcon from "@/components/SvgIcon/index.vue";
const logo: string = require("@/assets/logo.png");
@Component
export default class Auth extends Vue {
  logoUrl: string = logo;
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.auth {
  width: 100%;
  padding: 0.3rem 0.1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.1rem;
  .headportrait {
    padding: 0.1rem 0;
    .img {
      display: block;
      width: 0.85rem;
      height: 0.85rem;
      border-radius: 50%;
      border: 0.01rem solid @c_bg_line;
      box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;
      &:hover {
        box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
  .name {
    padding: 0.1rem 0;
    text-align: center;
    font-size: 0.2rem;
    color: @gray;
    line-height: 1.2;
    font-weight: bold;
  }
  .text {
    padding: 0.1rem 0;
    text-align: center;
    font-size: @f_text;
    color: @c_bg_title;
    line-height: 1.2;
  }
  .account_box {
    width: 100%;
    padding: 0.1rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      .icon_box {
        display: block;
        font-size: 0.3rem;
        color: @c_title;
        cursor: pointer;
        &:hover {
          color: @c_active;
        }
      }
    }
  }
}
</style>
