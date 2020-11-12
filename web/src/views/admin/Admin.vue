<template>
  <div class="admin">
    <div class="top">
      <Header></Header>
    </div>
    <div class="content">
      <div class="left">
        <Nav></Nav>
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";
@Component({
  components: {
    Header,
    Nav
  }
})
export default class Admin extends Vue {}
</script>
<style lang="less" scoped>
.admin {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
  }
  .content {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: flex-start;
    .left {
      width: 2rem;
      height: 100%;
    }
    .right {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
