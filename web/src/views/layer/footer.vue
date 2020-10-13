<template>
  <div class="footer">
    <div class="content_box">
      <div class="title">落落的个人博客</div>
      <div class="text">暂无可用信息</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import router from "@/router";
@Component
export default class Topic extends Vue {
  constructor() {
    super();
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.footer {
  width: 100%;
  border-top: 0.01rem dashed @c_bg_line;
  .content_box {
    width: 100%;
    height: 100%;
    max-width: @minWidth;
    margin: auto;
    padding: 0.15rem 0.3rem;
    .title {
      padding: 0.05rem 0;
      font-size: @f_text;
      color: @c_bg_title;
      line-height: 1.5;
      text-align: center;
      font-weight: bold;
    }
    .text {
      padding: 0.05rem 0;
      font-size: @f_tips;
      color: @c_bg_text;
      line-height: 1.5;
      text-align: center;
    }
  }
}
</style>
