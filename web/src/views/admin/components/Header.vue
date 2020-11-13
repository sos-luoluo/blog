<template>
  <div class="header">
    <div class="left">
      <span>博客后台管理系统</span>
      <span>欢迎你：{{ user.username }}</span>
    </div>
    <div class="right">
      <div class="btn">修改密码</div>
      <div class="btn">退出</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
@Component({})
export default class Header extends Vue {
  get user() {
    return this.$store.state.user;
  }
}
</script>
<style lang="less" scoped>
@import "../../../styles/config.less";
.header {
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  background-color: @c_bg_text;
  .left {
    font-size: 0.2rem;
    color: @c_main;
    line-height: 1.5;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn {
      margin-left: 0.2rem;
      width: 1rem;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @c_bg_tips;
      font-size: 0.16rem;
      color: @c_title;
      line-height: 1.5;
      cursor: pointer;
      border-radius: 0.1rem;
    }
  }
}
</style>
