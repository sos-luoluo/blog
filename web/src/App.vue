<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
export default class App extends Vue {}
</script>
<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
