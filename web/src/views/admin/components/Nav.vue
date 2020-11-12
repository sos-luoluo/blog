<template>
  <div class="nav">
    <div class="list">
      <div class="item">
        <router-link class="link" :to="{ path: '/admin/classification' }"
          >分类管理</router-link
        >
      </div>
      <div class="item">
        <router-link class="link" :to="{ path: '/admin/article' }"
          >文章管理</router-link
        >
      </div>
      <div class="item">
        <router-link class="link" :to="{ path: '/admin/user' }"
          >用户管理管理</router-link
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="less" scoped>
@import "../../../styles/config.less";
.nav {
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.1rem;
  background-color: @c_bg_line;
  overflow-y: auto;
  overflow-x: hidden;
  .list {
    .item {
      padding: 0.1rem 0;
      .link {
        display: block;
        width: 100%;
        height: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.16rem;
        color: @c_title;
        line-height: 1.5;
        background-color: @c_tips;
        border-radius: 0.05rem;
      }
    }
  }
}
</style>
